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
