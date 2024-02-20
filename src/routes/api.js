import { Router } from "express";
import biometryController from "../controllers/biometryController.js";
import multer from 'multer';
import multerConfig from "../middleware/multerConfig.js";


const routes = Router();
const storage = multerConfig.storage();
const upload = multer({ storage });

routes.get("/", (req, res) => { res.send("Hello world") });
routes.post("/reconUserface", upload.single('image'), biometryController.recogniseUserface);


export { routes }
