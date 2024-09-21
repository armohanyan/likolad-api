import express from 'express';
import {StaticsController} from "../controller";

const router = express.Router();

router.get('/', StaticsController.getStatics);

export default router;
