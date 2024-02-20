import { BiometryService } from "../services/biometryService.js";

export default {
    async recogniseUserface(req, res) {
        const service = new BiometryService();

        try {
            const reconResult = await service.verifyUserBiometry(req.body, req.file.filename);

            return res.status(200).json(reconResult)
        } catch (error) {
            return res.status(error.status || 500).json({ message: 'Internal Error Server' });
        }
    }
    
}