import { promises as fs } from 'fs';
import * as util from 'util';

const readFileAsync = util.promisify(fs.readFile);

export default {
    base64ToBlob(imageBase64) {
        const base64WithoutHeader = imageBase64.split(',')[1];
        const arrayBuffer = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0)).buffer;
        const blob = new Blob([arrayBuffer], { type: 'image/webp' })

        return blob;
    },
    async getImageBase64(pathToImage) {
        try {
          const data = await readFileAsync(pathToImage);
          const base64Data = data.toString('base64');
          
          return base64Data;
        } catch (error) {
          throw error;
        }
      }
}