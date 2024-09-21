import express from 'express';
import {OrderController} from "../controller";
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";
const router = express.Router();

router.get('/', authenticate, authorize(['admin']), OrderController.getOrders);
router.post('/', OrderController.createOrder);
router.put('/:id', authenticate, authorize(['admin']), OrderController.updateOrder);
router.delete('/:id', authenticate, authorize(['admin']), OrderController.deleteOrder);

export default router;
