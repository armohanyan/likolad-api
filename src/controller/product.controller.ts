import { SuccessHandlerUtil } from "../utils"
import { Request, Response, NextFunction } from 'express';
import ProductService from "../services/product.service";  // Import types

export default class ProductController {
    static async getProducts(req:Request, res: Response, next: NextFunction){
        try {
            const response = await ProductService.getProducts(req.query);
            SuccessHandlerUtil.handleList(res, next, response)
        } catch (error) {
            next(error)
        }
    }
    static async createProduct(req:Request, res: Response, next: NextFunction){
        try {
            const response = await ProductService.createProduct(req.body);

            SuccessHandlerUtil.handleAdd(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req:Request, res: Response, next: NextFunction){
        try {
            const response = await ProductService.updateProduct(parseInt(req.params.id), req.body);

            SuccessHandlerUtil.handleUpdate(res, next, response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req:Request, res: Response, next: NextFunction){
        try {
            const response = await ProductService.deleteProduct(parseInt(req.params.id));

            SuccessHandlerUtil.handleDelete(res, next, response)
        } catch (error) {
            next(error)
        }
    }

}