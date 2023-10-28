import express from 'express';
import {userController} from '../controllers/index.js'
const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/all', userController.getAllUser);
router.get('/:accountId', userController.getUser);
router.patch('/:accountId/balance', userController.rechargeBalance);
router.get('/tickets/:accountId', userController.getTicketsOfUser);

export default router