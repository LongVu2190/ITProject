import express from 'express';
import {userController} from '../controllers/index.js'
const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.patch('/recharge', userController.rechargeBalance);
router.get('/:accountId', userController.getUser);
router.get('/tickets/:accountId', userController.getTicketsOfUser);

export default router