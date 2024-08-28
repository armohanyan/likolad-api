import express from 'express';
import {TestimonialController} from "../controller";

const router = express.Router();

router.get('/', TestimonialController.getTestimonials);
router.post('/', TestimonialController.createTestimonial);
router.put('/:id', TestimonialController.updateTestimonial);
router.delete('/:id', TestimonialController.deleteTestimonial);

export default router;
