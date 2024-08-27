import express from 'express';
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";
import uploadMiddleware from "../middlewares/upload";
import {ProductController} from "../controller";

const router = express.Router();

// router.post('/', authenticate, authorize(['admin']), ProductController.createProduct);

router.get('/', ProductController.getProducts);
router.post('/', uploadMiddleware, ProductController.createProduct);
router.put('/:id', uploadMiddleware, ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
