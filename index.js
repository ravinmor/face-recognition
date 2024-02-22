import express from "express";
import cors from "cors";
import { routes } from "./src/routes/api.js";
import dotenv from 'dotenv';
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser({limit: '50mb'}))
app.use(express.json());

app.use(routes);

app.listen(port, () => console.log(`> Server is running on port ${port}`));
