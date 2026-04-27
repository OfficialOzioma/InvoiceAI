import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { Organization } from '../models/Organization.js';
import { OrganizationUser } from '../models/OrganizationUser.js';

export class AuthService {
  static async signup(email: string, password?: string, fullName?: string) {
    // Check if user exists
    const existingUser = await User.query().where('email', email).first();
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password || 'Password123!', 10);
    
    // Create User
    const user = new User();
    user.setAttribute('email', email);
    user.setAttribute('password', hashedPassword);
    user.setAttribute('full_name', fullName || '');
    await user.save();

    return { 
      user: { 
        id: user.getAttribute('id'), 
        email: user.getAttribute('email'), 
        full_name: user.getAttribute('full_name') 
      } 
    };
  }

  static async verifyOtp(email: string, token: string) {
    // For now, auto-verify for development
    const user = await User.query().where('email', email).first();
    if (!user) throw new Error('User not found');

    return { 
      user: { id: user.getAttribute('id'), email: user.getAttribute('email') },
      session: { access_token: `token_${user.getAttribute('id')}`, refresh_token: 'refresh_token' }
    };
  }

  static async login(email: string, password: string) {
    const user = await User.query().where('email', email).first();
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.getAttribute('password'));
    if (!isValid) throw new Error('Invalid credentials');

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

