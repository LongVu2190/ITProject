import express from 'express';
import {ticketController} from '../controllers/index.js'
const router = express.Router();

router.post('/', ticketController.addTicket);
router.get('/', ticketController.getTicket);

export default router