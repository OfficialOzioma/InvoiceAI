import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService.js';
import { OrganizationService } from '../services/organizationService.js';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const isAuthPath = req.path.startsWith('/login') || req.path.startsWith('/signup') || req.path.startsWith('/auth');

  // Unified user object retrieval
  let unifiedUser: any = null;

  if (req.user) {
    const user = req.user as any;
    unifiedUser = {
      id: typeof user.getAttribute === 'function' ? user.getAttribute('id') : user.id,
      email: typeof user.getAttribute === 'function' ? user.getAttribute('email') : user.email,
      displayName: typeof user.getAttribute === 'function' ? user.getAttribute('full_name') : (user.displayName || '')
    };
  } else {
    const token = req.cookies && req.cookies['sb-access-token'];
    if (token) {
      try {
        const { data } = await AuthService.getUserByToken(token);
        const user = data?.user;
        if (user) {
          unifiedUser = {
            id: user.getAttribute('id'),
            email: user.getAttribute('email'),
            displayName: user.getAttribute('full_name') || ''
          };
        }
      } catch (err) {
        res.clearCookie('sb-access-token');
      }
    }
  }

  if (unifiedUser) {
    (req as any).user = unifiedUser;
    // Redirect away from login/signup if already authenticated
    if (isAuthPath && !req.path.includes('logout') && !req.path.includes('callback')) {
      return res.redirect('/dashboard');
    }
  }

  next();
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!(req as any).user) {
    return res.redirect('/login');
  }
  next();
};

export const requireOrganization = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user) return res.redirect('/login');

  try {
    const orgs = await OrganizationService.getOrganizationsForUser(user.id);
    if (!orgs || orgs.length === 0) {
      if (!req.path.startsWith('/onboarding')) {
        return res.redirect('/onboarding/step/1');
      }
    } else if (req.path.startsWith('/onboarding')) {
      // If they have an org and try to go to onboarding, send to dashboard
      return res.redirect('/dashboard');
    }
  } catch (err) {
    console.error('Organization check error:', err);
  }
  next();
};
