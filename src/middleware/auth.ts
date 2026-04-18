import { Request, Response, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const session = req.cookies.session;
  
  if (session === 'mock-session-id') {
    (req as any).user = {
      uid: 'mock-user-id',
      email: 'admin@invoiceai.com',
      displayName: 'Jane Doe'
    };
  } else {
    (req as any).user = null;
  }
  
  next();
};
