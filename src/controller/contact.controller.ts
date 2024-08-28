import { SuccessHandlerUtil } from "../utils"
import { Request, Response, NextFunction } from 'express';
import ProductService from "../services/product.service";
import {CategoryService, ContactService} from "../services";

export default class ContactController {
    static async getContacts(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await ContactService.getContacts();

            SuccessHandlerUtil.handleList(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async createContact(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await ContactService.createContact(req.body);

            SuccessHandlerUtil.handleAdd(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async updateContract(req:Request, res: Response, next: NextFunction) {
        try {

            const response = await ContactService.updateContact(parseInt(req.params.id), req.body);

            SuccessHandlerUtil.handleUpdate(res, next, response)
        } catch (error) {
            next(error)
        }
    }
}