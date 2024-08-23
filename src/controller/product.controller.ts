import { SuccessHandlerUtil } from "../utils"
import { Request, Response, NextFunction } from 'express';
import ProductService from "../services/product.service";  // Import types

export default class ProductController {
    static async getProducts(req:Request, res: Response, next: NextFunction){
        try {
            const response = await ProductService.getProducts();

            SuccessHandlerUtil.handleList(res, next, response)
        } catch (error) {
            next(error)
        }
    }
    static async createProduct(req:Request, res: Response, next: NextFunction){
        try {
            const response = await ProductService.createProduct();

            SuccessHandlerUtil.handleAdd(res, next, response)
        } catch (error) {
            next(error)
        }
    }
}