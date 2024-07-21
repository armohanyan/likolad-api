
import { Request, Response, NextFunction } from 'express';
import {SuccessHandlerUtil} from "../utils";
import AuthService from "../services/auth.service";  // Import types

export default class AuthController {
    static async signUp(req: Request, res: Response, next: NextFunction){
        try {
            const response = await AuthService.signUp(req.body);
            
            SuccessHandlerUtil.handleAdd(res, next, response)
        } catch (error) {
            next(error)
        }
    }
}