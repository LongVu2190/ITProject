import express from 'express';
import {userController} from '../controllers/index.js'
const router = express.Router();

router.patch('/balance/', userController.updateBalance);
router.get('/balance/', userController.getBalance);
router.get('/login/', userController.getUser);
router.post('/', userController.addUser);

export default router