import express from 'express';
import {commentController} from '../controllers/index.js'
const router = express.Router();

router.post('/', commentController.addComment);
router.delete('/', commentController.deleteComment);
router.get('/:movieId', commentController.getCommentByMovie);

export default router