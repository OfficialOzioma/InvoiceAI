import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

export const getLogin = (req: Request, res: Response) => {
  res.render('pages/login', { title: 'Log In | InvoiceAI', error: req.query.error });
};

export const getSignup = (req: Request, res: Response) => {
  res.render('pages/signup', { title: 'Sign Up | InvoiceAI', error: req.query.error });
};

export const getForgotPassword = (req: Request, res: Response) => {
  res.render('pages/forgot-password', { title: 'Forgot Password | InvoiceAI', success: false });
};

export const getVerifyOtp = (req: Request, res: Response) => {
  const email = req.query.email as string;
  if (!email) return res.redirect('/signup');
  res.render('pages/verify-otp', { title: 'Verify Email | InvoiceAI', email, error: req.query.error });
};

export const postSignup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, provider } = req.body;
    
    if (provider === 'google') {
      const host = req.get('host') || 'localhost:3000';
      const { url } = await AuthService.getGoogleOAuthUrl(host);
      if (url) return res.redirect(url);
      return res.redirect('/signup?error=oauth_failed');
    }

    // Email path: sign up, sends OTP automatically if email confirmations are on
    await AuthService.signup(email, password, fullName);
    
    // Redirect to verify OTP page, passing the email via query string
    res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
  } catch (error: any) {
    console.error('Signup error:', error);
    if (error.message.includes('User already registered')) {
        return res.redirect('/signup?error=user_exists');
    }
    res.redirect('/signup?error=' + encodeURIComponent(error.message));
  }
};

export const postVerifyOtp = async (req: Request, res: Response) => {
  try {
    const email = (req.body.email || '').trim();
    const otp = (req.body.otp || '').trim();
    
    const data = await AuthService.verifyOtp(email, otp);
    
    // Set cookie sessions
    if (data.session) {
      res.cookie('sb-access-token', data.session.access_token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.cookie('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: true, sameSite: 'none' });
    }

    res.redirect('/onboarding');
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    // Include the actual error message so the user can debug it rather than generic valid_otp
    res.redirect(`/verify-otp?email=${encodeURIComponent(req.body.email)}&error=${encodeURIComponent(error.message || 'invalid_otp')}`);
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const data = await AuthService.login(email, password);
    
    if (data.session) {
      res.cookie('sb-access-token', data.session.access_token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.cookie('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: true, sameSite: 'none' });
    }
    
    res.redirect('/dashboard');
  } catch (error: any) {
    console.error('Login error:', error);
    // Specifically catch Supabase's generic invalid credentials message to prompt Google users.
    if (error.message.includes('Invalid login credentials')) {
       return res.redirect('/login?error=invalid_credentials');
    }
    res.redirect('/login?error=' + encodeURIComponent(error.message));
  }
};

export const getOAuthCallback = async (req: Request, res: Response) => {
  // DB removed for now, redirect to dashboard by default
  return res.redirect('/dashboard');
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('sb-access-token');
  res.clearCookie('sb-refresh-token');
  res.redirect('/');
};

export const postOAuthSession = async (req: Request, res: Response) => {
  try {
    const { access_token, refresh_token } = req.body;
    if (!access_token || !refresh_token) {
      return res.status(400).json({ success: false, error: 'Missing tokens' });
    }

    // Handle existing vs new user (DB removed for now)
    let redirectUrl = '/dashboard';
    res.json({ success: true, redirect: redirectUrl });
  } catch (error: any) {
    console.error('OAuth session error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

