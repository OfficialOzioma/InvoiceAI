import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { UserModel } from '../models/User.js';
import { OrganizationModel } from '../models/Organization.js';

export const getLogin = (req: Request, res: Response) => {
  res.render('pages/login', { title: 'Log In | InvoiceAI', error: req.query.error });
};

export const getSignup = (req: Request, res: Response) => {
  res.render('pages/signup', { title: 'Sign Up | InvoiceAI', error: req.query.error });
};

export const getForgotPassword = (req: Request, res: Response) => {
  res.render('pages/forgot-password', { title: 'Forgot Password | InvoiceAI', success: false });
};

export const getVerifyOtp = (req: Request, res: Response) => {
  const email = req.query.email as string;
  if (!email) return res.redirect('/signup');
  res.render('pages/verify-otp', { title: 'Verify Email | InvoiceAI', email, error: req.query.error });
};

export const postSignup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, provider } = req.body;
    
    if (provider === 'google') {
      const host = req.get('host') || 'localhost:3000';
      const { url } = await AuthService.getGoogleOAuthUrl(host);
      if (url) return res.redirect(url);
      return res.redirect('/signup?error=oauth_failed');
    }

    // Email path: sign up, sends OTP automatically if email confirmations are on
    await AuthService.signup(email, password, fullName);
    
    // Redirect to verify OTP page, passing the email via query string
    res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
  } catch (error: any) {
    console.error('Signup error:', error);
    if (error.message.includes('User already registered')) {
        return res.redirect('/signup?error=user_exists');
    }
    res.redirect('/signup?error=' + encodeURIComponent(error.message));
  }
};

export const postVerifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    
    const data = await AuthService.verifyOtp(email, otp);
    
    // Set cookie sessions
    if (data.session) {
      res.cookie('sb-access-token', data.session.access_token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.cookie('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: true, sameSite: 'none' });
    }

    res.redirect('/onboarding');
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    res.redirect(`/verify-otp?email=${encodeURIComponent(req.body.email)}&error=invalid_otp`);
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const data = await AuthService.login(email, password);
    
    if (data.session) {
      res.cookie('sb-access-token', data.session.access_token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.cookie('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: true, sameSite: 'none' });
    }
    
    res.redirect('/dashboard');
  } catch (error: any) {
    console.error('Login error:', error);
    // Specifically catch Supabase's generic invalid credentials message to prompt Google users.
    if (error.message.includes('Invalid login credentials')) {
       return res.redirect('/login?error=invalid_credentials');
    }
    res.redirect('/login?error=' + encodeURIComponent(error.message));
  }
};

export const getOAuthCallback = async (req: Request, res: Response) => {
  try {
    const { code, error, error_description } = req.query;
    
    if (error) {
       console.error('Supabase OAuth Error parameters:', error, error_description);
       return res.redirect('/login?error=' + encodeURIComponent(error_description as string || 'OAuth failed from provider'));
    }

    if (code) {
      const { data, error: sessionError } = await AuthService.exchangeCodeForSession(code as string);
      if (sessionError) throw sessionError;
      
      if (data?.session) {
        res.cookie('sb-access-token', data.session.access_token, { httpOnly: true, secure: true, sameSite: 'none' });
        res.cookie('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: true, sameSite: 'none' });
        
        const supabaseUser = data.user;
        if (supabaseUser) {
          // If the user doesn't physically exist in our DB yet, it's a first-time Google signin
          const existingUser = await UserModel.getById(supabaseUser.id);
          
          if (!existingUser) {
            // New user via Google OAuth, create Prisma wrapper immediately
            await UserModel.upsert(supabaseUser.id, supabaseUser.email || '', supabaseUser.user_metadata?.full_name);
            return res.redirect('/onboarding');
          }

          // Existing user check: do they have an organization?
          const organization = await OrganizationModel.getPrimaryForUser(supabaseUser.id);
          if (!organization) {
            return res.redirect('/onboarding');
          }
        }
      }
      
      return res.redirect('/dashboard');
    }
    
    // If no code and no error was passed, we reached the callback mysteriously
    // But since Supabase 'implicit flow' uses a URL hash (e.g. #access_token=...), 
    // it never reaches the Express server query params. 
    // We send an HTML page that extracts the hash and posts it back to our server.
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Authenticating...</title></head>
      <body>
        <script>
          const hash = window.location.hash;
          if (hash && hash.includes('access_token')) {
            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');
            if (accessToken) {
              fetch('/auth/set-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken })
              })
              .then(res => res.json())
              .then(data => {
                if (data.success) {
                  window.location.href = data.redirect || '/dashboard';
                } else {
                  window.location.href = '/login?error=oauth_failed';
                }
              })
              .catch(() => {
                window.location.href = '/login?error=oauth_failed';
              });
            } else {
              window.location.href = '/login?error=missing_oauth_code';
            }
          } else {
            window.location.href = '/login?error=missing_oauth_code';
          }
        </script>
      </body>
      </html>
    `);
  } catch (error: any) {
    console.error('OAuth Callback server error:', error);
    res.redirect('/login?error=' + encodeURIComponent(error?.message || 'oauth_failed'));
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('sb-access-token');
  res.clearCookie('sb-refresh-token');
  res.redirect('/');
};

export const postOAuthSession = async (req: Request, res: Response) => {
  try {
    const { access_token, refresh_token } = req.body;
    if (!access_token || !refresh_token) {
      return res.status(400).json({ success: false, error: 'Missing tokens' });
    }

    // Verify token with Supabase
    const { data: { user }, error } = await AuthService.getUserByToken(access_token);
    if (error || !user) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    // Set cookies
    res.cookie('sb-access-token', access_token, { httpOnly: true, secure: true, sameSite: 'none' });
    res.cookie('sb-refresh-token', refresh_token, { httpOnly: true, secure: true, sameSite: 'none' });

    // Handle existing vs new user
    const existingUser = await UserModel.getById(user.id);
    let redirectUrl = '/dashboard';

    if (!existingUser) {
      // New user via Google OAuth, create Prisma wrapper immediately
      await UserModel.upsert(user.id, user.email || '', user.user_metadata?.full_name);
      redirectUrl = '/onboarding';
    } else {
      const organization = await OrganizationModel.getPrimaryForUser(user.id);
      if (!organization) {
        redirectUrl = '/onboarding';
      }
    }

    res.json({ success: true, redirect: redirectUrl });
  } catch (error: any) {
    console.error('OAuth session error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

