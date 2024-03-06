import * as faceapi from 'face-api.js';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import textUtils from '../utils/text.js'
import { canvas } from '../commons/canvas.js';
import { faceDetectionNet, faceDetectionOptions } from '../commons/faceDetection.js';
import { Image } from 'canvas';

export class BiometryService {
  
    constructor() {}
  
    async verifyUserBiometry(id , image) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pathToWeights = `${__dirname}/../weights`;
        const pathToImage = `src/uploads/${image}`;
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
  
    async verifyUserBiometryBinary( id , image) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pathToWeights = `${__dirname}/../weights`;

        await faceDetectionNet.loadFromDisk(pathToWeights);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(pathToWeights);
        await faceapi.nets.faceRecognitionNet.loadFromDisk(pathToWeights);

        const referenceDescriptors = await this.loadUserLabeledImages(id);
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const userImage = new Image();
        userImage.src = buffer;

        const detections = await faceapi.detectAllFaces(userImage)
            .withFaceLandmarks()
            .withFaceDescriptors();

        const faceMatcher = new faceapi.FaceMatcher(referenceDescriptors);
        const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));

        const match = results.length == 0 ? false : (results[0]._label !== 'unknown');
        const resultBiometry = {
            id: id,
            match
        }
        console.log(resultBiometry)
        return resultBiometry;
    }

    async loadUserLabeledImages(id) {
        const labels = [textUtils.toSnakeCase(id)];
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const directoryPath = `${__dirname}/../labeled_images/${textUtils.toSnakeCase(id)}`;

        try {
            const files = await fs.readdir(directoryPath);
            const numberOfFiles = files.length;

            return Promise.all(
                labels.map(async label => {
                    const descriptions = [];

                    for (let i = 1; i <= numberOfFiles; i++) {
                        const pathToImage = `${__dirname}/../labeled_images/${label}/${i}.jpg`;
                        await fs.access(pathToImage);

                        const image = await canvas.loadImage(pathToImage);

                        const detections = await faceapi.detectSingleFace(image, faceDetectionOptions)
                            .withFaceLandmarks()
                            .withFaceDescriptor();

                        descriptions.push(detections.descriptor);
                    }

                    return new faceapi.LabeledFaceDescriptors(label, descriptions);
                })
            );
        } catch (err) {
            throw err;
        }
    }

} 