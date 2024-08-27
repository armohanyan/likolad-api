import express from 'express';
import ValidatorUtil from 'middlewares/validation/util/validator.util';
import {AuthController} from "../controller";

const router = express.Router();

router.post('/sign-up', ValidatorUtil.validateSignUp, AuthController.signUp);
router.post('/sign-in', ValidatorUtil.validateSignIn, AuthController.signIn);

export default router;
