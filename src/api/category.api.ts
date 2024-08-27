import express from 'express';
import ProductController from "../controller/product.controller";
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";
import uploadMiddleware from "../middlewares/upload";
import {CategoryController} from "../controller";

const router = express.Router();

router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;
