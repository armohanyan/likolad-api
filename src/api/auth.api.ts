import express from 'express';
import { UserController } from '../controller';
import AuthController from "../controller/auth.controller";

const router = express.Router();

router.post('/sign-up', AuthController.signUp);

export default router;
