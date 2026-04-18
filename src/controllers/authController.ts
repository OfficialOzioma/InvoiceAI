import { Request, Response } from 'express';

export const getLogin = (req: Request, res: Response) => {
  res.render('pages/login', { title: 'Log In | InvoiceAI' });
};

export const getSignup = (req: Request, res: Response) => {
  res.render('pages/signup', { title: 'Sign Up | InvoiceAI' });
};

export const getForgotPassword = (req: Request, res: Response) => {
  res.render('pages/forgot-password', { title: 'Forgot Password | InvoiceAI' });
};

export const getVerifyOtp = (req: Request, res: Response) => {
  res.render('pages/verify-otp', { title: 'Verify Email | InvoiceAI' });
};

export const postSignup = async (req: Request, res: Response) => {
  const { businessName, email, password, provider } = req.body;
  
  // Logic:
  // 1. Create user in Firebase Auth
  // 2. Create entry in Firestore: { email, onboardingStatus: 'in-progress', currentOnboardingStep: 1, isVerified: provider === 'google' }
  
  if (provider === 'google') {
    res.cookie('session', 'mock-google-session', { httpOnly: true });
    return res.redirect('/onboarding/step/1');
  }

  // Email path: send OTP and verify
  res.cookie('session', 'temp-session', { httpOnly: true });
  res.redirect('/verify-otp');
};

export const postVerifyOtp = async (req: Request, res: Response) => {
  // 1. Check if OTP is correct
  // 2. Update Firestore: isVerified = true
  res.redirect('/onboarding/step/1');
};

export const postLogin = async (req: Request, res: Response) => {
  // Simplified login for this migration demo
  // In a real app, verify with Firebase Admin
  const { email, password } = req.body;
  
  if (email === 'admin@invoiceai.com' && password === 'password123') {
     // Set a session cookie (mocked for now)
     res.cookie('session', 'mock-session-id', { httpOnly: true, secure: true });
     return res.redirect('/dashboard');
  }
  
  res.redirect('/login?error=invalid');
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('session');
  res.redirect('/');
};
