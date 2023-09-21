import express from 'express';
import {commentController} from '../controllers/index.js'
const router = express.Router();

router.post('/', commentController.addComment);
router.delete('/:id', commentController.deleteComment);
router.get('/', commentController.getCommentByMovie);

export default router