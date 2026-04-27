import { Router } from 'express';
import { getLogin, postLogin, logout, getSignup, getForgotPassword, getVerifyOtp, postSignup, postVerifyOtp, getOAuthCallback, postOAuthSession } from '../controllers/authController.js';
import { signupValidation, loginValidation, otpValidation } from '../middleware/validation.js';
import passport from 'passport';

const router = Router();

router.get('/login', getLogin);
router.get('/signup', getSignup);
router.get('/forgot-password', getForgotPassword);
router.get('/verify-otp', getVerifyOtp);

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login?error=google_failed' }),
  (req, res) => {
    // On success, set our manual token as well for consistency with checkAuth
    const user = req.user as any;
    if (user) {
        res.cookie('sb-access-token', `token_${user.getAttribute('id')}`, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' 
        });
    }
    res.redirect('/onboarding');
  }
);

router.get('/auth/callback', getOAuthCallback);
router.post('/auth/set-session', postOAuthSession);
router.post('/auth/login', loginValidation, postLogin);
router.post('/auth/signup', signupValidation, postSignup);
router.post('/auth/verify-otp', otpValidation, postVerifyOtp);
router.post('/auth/logout', logout);

export default router;
