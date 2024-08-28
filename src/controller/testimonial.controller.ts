import { SuccessHandlerUtil } from "../utils"
import { Request, Response, NextFunction } from 'express';
import {TestimonialService} from "../services";

export default class TestimonialController {
    static async getTestimonials(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await TestimonialService.getTestimonials();

            SuccessHandlerUtil.handleList(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async createTestimonial(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await TestimonialService.createTestimonial(req.body);

            SuccessHandlerUtil.handleAdd(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async updateTestimonial(req:Request, res: Response, next: NextFunction) {
        try {

            const response = await TestimonialService.updateTestimonial(parseInt(req.params.id), req.body);

            SuccessHandlerUtil.handleUpdate(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteTestimonial(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await TestimonialService.deleteTestimonial(parseInt(req.params.id));

            SuccessHandlerUtil.handleDelete(res, next, response)
        } catch (error) {
            next(error)
        }
    }
}