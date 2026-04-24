import { Request, Response, NextFunction } from 'express';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  // We keep mock user so the preview doesn't hard-break until custom auth is built.
  (req as any).user = {
    id: 'mock-user-id',
    email: 'admin@invoiceai.com',
    displayName: 'Development User',
    provider: 'dev'
  };
  
  next();
};
