import express from 'express';
import {showTimeController} from '../controllers/index.js'
const router = express.Router();

router.post('/', showTimeController.addShowTime);

export default router