import express from 'express';
import {showTimeController} from '../controllers/index.js'
const router = express.Router();

router.post('/', showTimeController.addShowTime);
router.get('/current', showTimeController.getCurrentShowTime);
router.get('/coming', showTimeController.getComingShowTime);

export default router