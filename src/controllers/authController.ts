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
    const { businessName, email, password, provider } = req.body;
    
    if (provider === 'google') {
      const { url } = AuthService.getGoogleOAuthUrl();
      if (url) return res.redirect(url);
      return res.redirect('/signup?error=oauth_failed');
    }

    // Email path: sign up, sends OTP automatically if email confirmations are on
    await AuthService.signup(email, password, businessName);
    
    // Redirect to verify OTP page, passing the email via query string
    res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
  } catch (error: any) {
    console.error('Signup error:', error);
    res.redirect('/signup?error=' + encodeURIComponent(error.message));
  }
};

export const postVerifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    
    const data = await AuthService.verifyOtp(email, otp);
    
    // Set cookie sessions
    if (data.session) {
      res.cookie('sb-access-token', data.session.access_token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.cookie('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: true, sameSite: 'none' });
    }

    res.redirect('/onboarding');
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    res.redirect(`/verify-otp?email=${encodeURIComponent(req.body.email)}&error=invalid_otp`);
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
    res.redirect('/login?error=invalid_credentials');
  }
};

export const getOAuthCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (code) {
      const { data, error } = await AuthService.exchangeCodeForSession(code as string);
      if (error) throw error;
      
      if (data.session) {
        res.cookie('sb-access-token', data.session.access_token, { httpOnly: true, secure: true, sameSite: 'none' });
        res.cookie('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: true, sameSite: 'none' });
      }
      
      // We can also ensure user and org records exist here just like in verifyOtp,
      // but for simpicity, we'll direct them towards the dashboard.
      return res.redirect('/dashboard');
    }
    res.redirect('/login');
  } catch (error: any) {
    console.error('OAuth Callback error:', error);
    res.redirect('/login?error=oauth_failed');
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('sb-access-token');
  res.clearCookie('sb-refresh-token');
  res.redirect('/');
};

