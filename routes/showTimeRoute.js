import express from 'express';
import { showTimeController } from '../controllers/index.js'
const router = express.Router();

router.post('/add', showTimeController.addShowTime);
router.get('/coming', showTimeController.getComingShowTime);
router.get('/now', showTimeController.getNowShowTime);
router.get('/seats', showTimeController.getSeatsOfShowTime);
router.get('/:movieId', showTimeController.getTimes);

export default router