import express from 'express';
import {movieController} from '../controllers/index.js'
const router = express.Router();

router.post('/', movieController.addMovie);
router.get('/', movieController.getCurrentMovie);

export default router