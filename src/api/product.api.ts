import express from 'express';
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";
import uploadMiddleware from "../middlewares/upload";
import {ProductController} from "../controller";

const router = express.Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', authenticate, authorize(['admin']), uploadMiddleware, ProductController.createProduct);
router.put('/:id', authenticate, authorize(['admin']), uploadMiddleware, ProductController.updateProduct);
router.delete('/:id',authenticate, authorize(['admin']), ProductController.deleteProduct);

export default router;
