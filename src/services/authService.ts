import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { Organization } from '../models/Organization.js';
import { OrganizationUser } from '../models/OrganizationUser.js';

export class AuthService {
  static async signup(email: string, password?: string, fullName?: string) {
    const existingUser = await User.query().where('email', email).first();
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password || 'Password123!', 10);
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = new User();
    user.setAttribute('email', email);
    user.setAttribute('password', hashedPassword);
    user.setAttribute('full_name', fullName || '');
    user.setAttribute('auth_provider', 'manual');
    user.setAttribute('otp_code', otp);
    user.setAttribute('otp_expires_at', expiresAt);
    user.setAttribute('is_verified', false);
    await user.save();

    console.log(`\x1b[32m[AUTH] OTP for ${email}: ${otp}\x1b[0m`);

    return { 
      user: { 
        id: user.getAttribute('id'), 
        email: user.getAttribute('email'), 
        full_name: user.getAttribute('full_name') 
      } 
    };
  }

  static async verifyOtp(email: string, token: string) {
    const user = await User.query()
      .where('email', email)
      .where('otp_code', token)
      .where('otp_expires_at', '>', new Date())
      .first();

    if (!user) throw new Error('Invalid or expired OTP');

    user.setAttribute('is_verified', true);
    user.setAttribute('otp_code', null);
    user.setAttribute('otp_expires_at', null);
    await user.save();

    return { 
      user: { id: user.getAttribute('id'), email: user.getAttribute('email') },
      session: { access_token: `token_${user.getAttribute('id')}`, refresh_token: 'refresh_token' }
    };
  }

  static async login(email: string, password: string) {
    const user = await User.query().where('email', email).first();
    if (!user) throw new Error('Invalid credentials');

    if (user.getAttribute('auth_provider') === 'google') {
      throw new Error('This account is linked with Google. Please login with Google.');
    }

    const isValid = await bcrypt.compare(password, user.getAttribute('password'));
    if (!isValid) throw new Error('Invalid credentials');

    if (!user.getAttribute('is_verified')) {
      throw new Error('Account not verified. Please check your console for the OTP.');
    }

    return { 
      user: { 
        id: user.getAttribute('id'), 
        email: user.getAttribute('email'),
        full_name: user.getAttribute('full_name')
      },
      session: { 
        access_token: `token_${user.getAttribute('id')}`, 
        refresh_token: 'refresh_token' 
      }
    };
  }

  static async setupOrganization(userId: string, orgName: string) {
    const org = new Organization();
    org.setAttribute('name', orgName);
    await org.save();

    const orgUser = new OrganizationUser();
    orgUser.setAttribute('organization_id', org.getAttribute('id'));
    orgUser.setAttribute('user_id', userId);
    orgUser.setAttribute('role', 'owner');
    await orgUser.save();

    return org;
  }

  static async resetPassword(email: string) {
    return true;
  }

  static async exchangeCodeForSession(code: string) {
    return { session: { access_token: 'mock_access_token', refresh_token: 'mock_refresh_token' } };
  }

  static async getGoogleOAuthUrl(host: string) {
    return { url: '/auth/callback?code=mock_google_code' };
  }

  static async getUserByToken(token: string) {
    if (!token.startsWith('token_')) return { data: null, error: 'Invalid token' };
    const userId = token.replace('token_', '');
    const user = await User.query().where('id', userId).first();
    return { data: { user }, error: user ? null : 'User not found' };
  }
}

