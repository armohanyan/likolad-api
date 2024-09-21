import express from 'express';
import {TestimonialController} from "../controller";
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";

const router = express.Router();

router.get('/', TestimonialController.getTestimonials);
router.post('/', authenticate, authorize(['admin']), TestimonialController.createTestimonial);
router.put('/:id', authenticate, authorize(['admin']), TestimonialController.updateTestimonial);
router.delete('/:id', authenticate, authorize(['admin']), TestimonialController.deleteTestimonial);

export default router;
