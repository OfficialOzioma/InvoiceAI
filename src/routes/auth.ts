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
router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err: any, user: any, info: any) => {
    if (err) {
      console.error('Passport Google Auth Error:', err);
      return res.redirect('/login?error=' + encodeURIComponent(err.message || 'google_failed'));
    }
    if (!user) {
      console.error('Passport Google Auth Failed:', info);
      return res.redirect('/login?error=' + encodeURIComponent(info?.message || 'google_failed'));
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Passport Login Error:', err);
        return res.redirect('/login?error=login_failed');
      }
      
      // On success, set our manual token as well for consistency with checkAuth
      if (user) {
          const userId = typeof user.getAttribute === 'function' ? user.getAttribute('id') : user.id;
          res.cookie('sb-access-token', `token_${userId}`, { 
              httpOnly: true, 
              secure: process.env.NODE_ENV === 'production', 
              sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' 
          });
      }
      res.redirect('/onboarding');
    });
  })(req, res, next);
});

router.get('/auth/callback', getOAuthCallback);
router.post('/auth/set-session', postOAuthSession);
router.post('/auth/login', loginValidation, postLogin);
router.post('/auth/signup', signupValidation, postSignup);
router.post('/auth/verify-otp', otpValidation, postVerifyOtp);
router.post('/auth/logout', logout);

export default router;
