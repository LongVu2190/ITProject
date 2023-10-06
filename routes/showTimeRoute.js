import express from 'express';
import {showTimeController} from '../controllers/index.js'
const router = express.Router();

router.post('/', showTimeController.addShowTime);
router.get('/coming', showTimeController.getComingShowTime);
router.get('/now', showTimeController.getNowShowTime);
router.get('/now/:movieId', showTimeController.getTimeOfNow);
router.get('/coming/:movieId', showTimeController.getTimeOfComing);
router.get('/seats', showTimeController.getSeatsOfShowTime);

export default router