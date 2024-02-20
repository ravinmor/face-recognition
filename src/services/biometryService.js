import * as faceapi from 'face-api.js';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import textUtils from '../utils/text.js'
import { canvas } from '../commons/canvas.js';
import { faceDetectionNet, faceDetectionOptions } from '../commons/faceDetection.js';

export class BiometryService {
  
    constructor() {}
  
    async verifyUserBiometry({ id }, imageName) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pathToWeights = `${__dirname}/../weights`;
        const pathToImage = `src/uploads/${imageName}`;
        await fs.access(pathToImage);

        await faceDetectionNet.loadFromDisk(pathToWeights);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(pathToWeights);
        await faceapi.nets.faceRecognitionNet.loadFromDisk(pathToWeights);

        const referenceDescriptors = await this.loadUserLabeledImages(id);
        
        const userImage = await canvas.loadImage(pathToImage);

        const detections = await faceapi.detectAllFaces(userImage)
            .withFaceLandmarks()
            .withFaceDescriptors();
            
        const faceMatcher = new faceapi.FaceMatcher(referenceDescriptors)
        const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor))
        
        return {
            id: id,
            path: pathToImage,
            match: results[0]._label !== 'unknown'
        };
    }

    loadUserLabeledImages(id) {
        const labels = [textUtils.toSnakeCase(id)];

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        return Promise.all(
            labels.map(async label => {
            const descriptions = [];

            for (let i = 1; i <= 5; i++) {
                const pathToImage = `${__dirname}/../labeled_images/${label}/${i}.jpg`;
                await fs.access(pathToImage);

                const image = await canvas.loadImage(pathToImage);

                const detections = await faceapi.detectSingleFace(image, faceDetectionOptions)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
        
                descriptions.push(detections.descriptor);
            }

            const descritorsArray = new faceapi.LabeledFaceDescriptors(label, descriptions);
            return descritorsArray;
            })
        )
    }
} 