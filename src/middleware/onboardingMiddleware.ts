import { Request, Response, NextFunction } from 'express';

// Mock function to get onboarding status from Firestore
// In a real app, this would use the Firebase Admin SDK
export const enforceOnboarding = async (req: Request, res: Response, next: NextFunction) => {
  const session = req.cookies.session;
  const publicPaths = [
    '/login', 
    '/signup', 
    '/forgot-password', 
    '/verify-otp',
    '/', 
    '/css', 
    '/js', 
    '/images',
    '/auth/login',
    '/auth/signup',
    '/auth/verify-otp',
    '/auth/logout'
  ];

  // Check if current path is public or an asset
  const isPublic = publicPaths.some(path => req.path === path || req.path.startsWith('/css/') || req.path.startsWith('/js/') || req.path.startsWith('/images/') || req.path.startsWith('/auth/'));

  if (isPublic) {
    return next();
  }

  if (!session) {
    return res.redirect('/login');
  }

  // If on onboarding route, continue
  if (req.path.startsWith('/onboarding') || req.path.startsWith('/verify-otp')) {
    return next();
  }

  // Mock check: if not in dashboard/invoices yet, redirect to onboarding if needed
  // This would be replaced with real Firestore user.onboardingStatus check
  
  next();
};
