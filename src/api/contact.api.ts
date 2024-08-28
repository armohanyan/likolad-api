import express from 'express';
import {ContactController} from "../controller";

const router = express.Router();

router.get('/', ContactController.getContacts);
router.post('/', ContactController.createContact);
router.put('/:id', ContactController.updateContract);

export default router;
