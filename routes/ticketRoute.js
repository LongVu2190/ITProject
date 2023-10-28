import express from 'express';
import {ticketController} from '../controllers/index.js'
const router = express.Router();

router.post('/', ticketController.buyTickets);
router.get('/all', ticketController.getAllTicket);

export default router