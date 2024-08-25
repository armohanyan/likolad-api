import express from 'express';
import { UserController } from '../controller';
import ProductController from "../controller/product.controller";
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";

const router = express.Router();

router.get('/', ProductController.getProducts);
// router.post('/', authenticate, authorize(['admin']), ProductController.createProduct);
router.post('/', ProductController.createProduct);

export default router;
