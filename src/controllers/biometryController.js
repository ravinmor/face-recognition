import { BiometryService } from "../services/biometryService.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default {
    async recogniseUserface(req, res) {
        const service = new BiometryService();

        try {
            const reconResult = await service.verifyUserBiometry(req.body.id, req.file.filename);

            return res.status(200).json(reconResult)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error });
        }
    },
    async reconUserfaceBinary(req, res) {
        const service = new BiometryService();

        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);

            function removerMascaraCPF(cpf) {
                return cpf.replace(/\D/g, '');
            }
            
            var cpfSemMascara = removerMascaraCPF(req.body.id);
    
            const pathToImage = `${__dirname}/../labeled_images/${cpfSemMascara}/`;
            if (!fs.existsSync(pathToImage)) {
                throw { status: 403, message: 'User not found' };
            }

            const reconResult = await service.verifyUserBiometryBinary(cpfSemMascara, req.body.image);

            return res.status(200).json(reconResult)
        } catch (error) {
            console.error(error)
            return res.status(error.status || 500).json({ message: error.message });
        }
    }
    
}