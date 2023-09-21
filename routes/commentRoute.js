import express from 'express';
import {commentController} from '../controllers/index.js'
const router = express.Router();

router.post('/', commentController.addComment);

export default router