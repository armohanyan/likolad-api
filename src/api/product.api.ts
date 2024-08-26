import express from 'express';
import ProductController from "../controller/product.controller";
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";
import uploadMiddleware from "../middlewares/upload";

const router = express.Router();

router.get('/', ProductController.getProducts);
// router.post('/', authenticate, authorize(['admin']), ProductController.createProduct);
router.post('/', uploadMiddleware, ProductController.createProduct);

export default router;
