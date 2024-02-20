import multer from 'multer';

export default {
    storage() {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'src/uploads/')
            },
            filename: function (req, file, cb) {
                const name = file.originalname.split('.')[0];

                const imageName = `${name}.jpg`;
                const customMimeType = 'image/jpg';

                file.mimetype = customMimeType;
                
                cb(null, imageName);
            },

        });
    }
}