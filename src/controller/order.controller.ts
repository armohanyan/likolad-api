
import { SuccessHandlerUtil } from "../utils"
import { Request, Response, NextFunction } from 'express';
import {OrderService, TestimonialService} from "../services";

export default class OrderController {
    static async getOrders(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await OrderService.getOrders(req.query);

            SuccessHandlerUtil.handleList(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async createOrder(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await OrderService.createOrder(req.body);

            SuccessHandlerUtil.handleAdd(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async updateOrder(req:Request, res: Response, next: NextFunction) {
        try {

            const response = await OrderService.updateOrder(parseInt(req.params.id), req.body);

            SuccessHandlerUtil.handleUpdate(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteOrder(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await OrderService.deleteOrder(parseInt(req.params.id));

            SuccessHandlerUtil.handleDelete(res, next, response)
        } catch (error) {
            next(error)
        }
    }
}