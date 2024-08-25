import express from 'express';
import { UserController } from '../controller';
import AuthController from "../controller/auth.controller";
import ValidatorUtil from 'middlewares/validation/util/validator.util';

const router = express.Router();

router.post('/sign-up', ValidatorUtil.validateSignUp, AuthController.signUp);
router.post('/sign-in', ValidatorUtil.validateSignIn, AuthController.signIn);

export default router;
