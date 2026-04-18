import { Request, Response, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const session = req.cookies.session;
  
  if (session) {
    (req as any).user = {
      uid: 'mock-user-id',
      email: session === 'mock-google-session' ? 'google@user.com' : 'email@user.com',
      displayName: 'Jane Doe',
      provider: session === 'mock-google-session' ? 'google' : 'email'
    };
  } else {
    (req as any).user = null;
  }
  
  next();
};
