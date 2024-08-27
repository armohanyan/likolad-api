import { SuccessHandlerUtil } from "../utils"
import { Request, Response, NextFunction } from 'express';
import ProductService from "../services/product.service";
import {CategoryService} from "../services";

export default class CategoryController {
    static async getCategories(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await CategoryService.getCategories();

            SuccessHandlerUtil.handleList(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async createCategory(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await CategoryService.createCategory(req.body);

            SuccessHandlerUtil.handleAdd(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async updateCategory(req:Request, res: Response, next: NextFunction) {
        try {

            const response = await CategoryService.updateCategory(parseInt(req.params.id), req.body);

            SuccessHandlerUtil.handleUpdate(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(req:Request, res: Response, next: NextFunction) {
        try {
            const response = await CategoryService.deleteCategory(parseInt(req.params.id));

            SuccessHandlerUtil.handleDelete(res, next, response)
        } catch (error) {
            next(error)
        }
    }
}