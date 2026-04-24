import { supabase } from '../lib/supabase.js';
import { UserModel } from '../models/User.js';
import { OrganizationModel } from '../models/Organization.js';

export class AuthService {
  static async signup(email: string, password?: string, fullName?: string) {
    // We pass fullName in metadata so we can retrieve it when creating the PRISMA user
    const { data, error } = await supabase.auth.signUp({
      email,
      password: password || 'Password123!', // Simple fallback if not provided
      options: {
        data: {
          full_name: fullName || ''
        }
      }
    });

    if (error) throw error;
    return data;
  }

  static async verifyOtp(email: string, token: string) {
    const isTokenHash = token.length > 6;
    
    let result;
    if (isTokenHash) {
      result = await supabase.auth.verifyOtp({ token_hash: token, type: 'email' });
    } else {
      result = await supabase.auth.verifyOtp({ email, token, type: 'signup' });
    }

    const { data, error } = result;
    if (error) throw error;

    const user = data?.user;
    if (user) {
      // Create user entry in Prisma
      await UserModel.upsert(user.id, user.email || email, user.user_metadata?.full_name);
      
      // We skip Organization creation here now.
      // Organizations will be strictly created during the Onboarding Flow later!
    }

    return data;
  }

  static async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  static async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/auth/update-password',
    });
    if (error) throw error;
    return data;
  }

  static async exchangeCodeForSession(code: string) {
    return await supabase.auth.exchangeCodeForSession(code);
  }

  static async getGoogleOAuthUrl(host: string) {
    // Dynamically detect if we are on Cloud Run or Localhost
    const isCloudRun = host.includes('run.app');
    const protocol = isCloudRun ? 'https' : 'http';
    const redirectUri = `${protocol}://${host}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri
      }
    });
    if (error) throw error;
    return data;
  }
}
