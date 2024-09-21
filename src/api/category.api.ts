import express from 'express';
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";
import {CategoryController} from "../controller";

const router = express.Router();

router.get('/', CategoryController.getCategories);
router.post('/', authenticate, authorize(['admin']), CategoryController.createCategory);
router.put('/:id',authenticate, authorize(['admin']), CategoryController.updateCategory);
router.delete('/:id',authenticate, authorize(['admin']), CategoryController.deleteCategory);

export default router;
