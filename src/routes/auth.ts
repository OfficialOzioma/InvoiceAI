import { Router } from 'express';
import { getLogin, postLogin, logout, getSignup, getForgotPassword, getVerifyOtp, postSignup, postVerifyOtp } from '../controllers/authController.js';

const router = Router();

router.get('/login', getLogin);
router.get('/signup', getSignup);
router.get('/forgot-password', getForgotPassword);
router.get('/verify-otp', getVerifyOtp);
router.post('/auth/login', postLogin);
router.post('/auth/signup', postSignup);
router.post('/auth/verify-otp', postVerifyOtp);
router.post('/auth/logout', logout);

export default router;
