import '@tensorflow/tfjs-node';

import * as faceapi from 'face-api.js';
import * as canvas from 'canvas';

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

export { canvas }