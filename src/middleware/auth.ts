import { Request, Response, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  // Always provide a mock user for development/free navigation
  (req as any).user = {
    uid: 'mock-user-id',
    email: 'admin@invoiceai.com',
    displayName: 'Development User',
    provider: 'dev'
  };
  
  next();
};
