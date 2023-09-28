import express from 'express';
import {showTimeController} from '../controllers/index.js'
const router = express.Router();

router.post('/', showTimeController.addShowTime);
router.get('/coming', showTimeController.getComingShowTime);
router.get('/today', showTimeController.getTodayShowTime);
router.get('/seats', showTimeController.getSeatsOfShowTime);

export default router