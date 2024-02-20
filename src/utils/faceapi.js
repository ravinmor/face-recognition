import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as faceapi from 'face-api.js';
import { faceDetectionNet, faceDetectionOptions } from '../commons/faceDetection.js';

export default {
    async loadFaceRecognition() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pathToWeights = `${__dirname}/../weights`;

        console.log('> Initializing facial recognition')
        
        await faceDetectionNet.loadFromDisk(pathToWeights);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(pathToWeights);
        await faceapi.nets.faceRecognitionNet.loadFromDisk(pathToWeights);

        return faceapi;
    }
}