import express from 'express';
import {ticketController} from '../controllers/index.js'
const router = express.Router();

router.post('/', ticketController.addTicket);
router.get('/seats', ticketController.getSeatsOfShowTime);

export default router