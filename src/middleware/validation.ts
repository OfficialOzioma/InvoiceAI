import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  // For standard form posts, we might want to redirect back with errors
  const errorMsg = errors.array()[0].msg;
  const backURL = req.header('Referer') || '/';
  
  // If it's an API request, return JSON
  if (req.path.startsWith('/api') || req.xhr || req.headers.accept?.includes('json')) {
    return res.status(400).json({ error: errorMsg, errors: errors.array() });
  }

  // Redirect back with first error
  const url = new URL(backURL, `http://${req.get('host')}`);
  url.searchParams.set('error', errorMsg);
  return res.redirect(url.pathname + url.search);
};

export const signupValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  validate
];

export const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

export const otpValidation = [
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  validate
];

export const onboardingStep1Validation = [
  body('businessName').trim().notEmpty().withMessage('Business name is required'),
  validate
];

export const onboardingStep2Validation = [
  body('industry').optional().trim(),
  validate
];
