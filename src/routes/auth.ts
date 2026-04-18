import { Router } from 'express';
import { getLogin, postLogin, logout } from '../controllers/authController.js';

const router = Router();

router.get('/login', getLogin);
router.post('/auth/login', postLogin);
router.post('/auth/logout', logout);

export default router;
