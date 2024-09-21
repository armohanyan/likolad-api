import { SuccessHandlerUtil } from "../utils"
import { Request, Response, NextFunction } from 'express';
import {StaticsService} from "../services";

export default class StaticsController {
    static async getStatics(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await StaticsService.getStatics();
 
            console.log(response);
            
            SuccessHandlerUtil.handleGet(res, next, response)
        } catch (error) {
            next(error)
        }
    }
}