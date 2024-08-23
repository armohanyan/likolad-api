import express from 'express';
import { UserController } from '../controller';
import ProductController from "../controller/product.controller";

const router = express.Router();

router.get('/', ProductController.getProducts);
router.post('/', ProductController.createProduct);

export default router;
