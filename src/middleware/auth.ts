import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies && req.cookies['sb-access-token'];
  
  if (token) {
    try {
      const { data, error } = await AuthService.getUserByToken(token);
      const user = data?.user;
      
      if (user && !error) {
        (req as any).user = {
          id: user.getAttribute('id'),
          email: user.getAttribute('email'),
          displayName: user.getAttribute('full_name') || ''
        };
        return next();
      }
    } catch (err) {
      console.error('Auth check error:', err);
    }
  }

  // Allow auth routes and index, otherwise redirect or block
  if (req.path.startsWith('/api') && !req.path.includes('/auth')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};
