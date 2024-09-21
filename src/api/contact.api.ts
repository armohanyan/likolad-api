import express from 'express';
import {ContactController} from "../controller";
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";
const router = express.Router();

router.get('/', ContactController.getContacts);
router.post('/', authenticate, authorize(['admin']), ContactController.createContact);
router.put('/:id', ContactController.updateContract);

export default router;
