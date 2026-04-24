import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

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
    const email = (req.body.email || '').trim();
    const otp = (req.body.otp || '').trim();
    
    const data = await AuthService.verifyOtp(email, otp);
    
    // Set cookie sessions
    if (data.session) {
      res.cookie('sb-access-token', data.session.access_token, { httpOnly: true, secure: true, sameSite: 'none' });
      res.cookie('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: true, sameSite: 'none' });
    }

    res.redirect('/onboarding');
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    // Include the actual error message so the user can debug it rather than generic valid_otp
    res.redirect(`/verify-otp?email=${encodeURIComponent(req.body.email)}&error=${encodeURIComponent(error.message || 'invalid_otp')}`);
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
        // DB removed for now, redirect to dashboard by default
        return res.redirect('/dashboard');
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
        <p id="status">Processing authentication...</p>
        <script>
          const hash = window.location.hash;
          const statusEl = document.getElementById('status');
          
          if (hash && hash.includes('access_token')) {
            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');
            
            if (accessToken) {
              statusEl.innerText = 'Token found, setting session...';
              fetch('/auth/set-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken })
              })
              .then(res => res.json())
              .then(data => {
                if (data.success) {
                  statusEl.innerText = 'Success! Redirecting...';
                  window.location.href = data.redirect || '/dashboard';
                } else {
                  statusEl.innerText = 'Session failed: ' + data.error;
                  setTimeout(() => {
                    window.location.href = '/login?error=oauth_failed_server_' + encodeURIComponent(data.error);
                  }, 3000);
                }
              })
              .catch(err => {
                statusEl.innerText = 'Fetch error: ' + err.message;
                setTimeout(() => {
                  window.location.href = '/login?error=oauth_failed_fetch';
                }, 3000);
              });
            } else {
              statusEl.innerText = 'No access token in hash.';
              setTimeout(() => { window.location.href = '/login?error=missing_oauth_code_in_hash'; }, 2000);
            }
          } else {
            statusEl.innerText = 'No valid hash found. Url: ' + window.location.href;
            setTimeout(() => { window.location.href = '/login?error=missing_oauth_code_no_hash'; }, 2000);
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

    // Handle existing vs new user (DB removed for now)
    let redirectUrl = '/dashboard';
    // Assume redirect to dashboard for now
    res.json({ success: true, redirect: redirectUrl });
  } catch (error: any) {
    console.error('OAuth session error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

