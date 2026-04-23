import { supabase } from '../lib/supabase.js';
import { UserModel } from '../models/User.js';
import { OrganizationModel } from '../models/Organization.js';

export class AuthService {
  static async signup(email: string, password?: string, businessName?: string) {
    // We pass businessName in data so we can retrieve it when verifying OTP
    const { data, error } = await supabase.auth.signUp({
      email,
      password: password || 'Password123!', // Simple fallback if not provided
      options: {
        data: {
          businessName: businessName || ''
        }
      }
    });

    if (error) throw error;
    return data;
  }

  static async verifyOtp(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });

    if (error) throw error;

    const user = data.user;
    if (user) {
      // Create user entry in Prisma
      await UserModel.upsert(user.id, user.email || email, user.user_metadata?.full_name);

      // Create organization if they provided a business name during signup
      const businessName = user.user_metadata?.businessName;
      if (businessName) {
        await OrganizationModel.create(user.id, { name: businessName, email: user.email });
      }
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

  static getGoogleOAuthUrl() {
    const { data } = supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/auth/callback` : 'http://localhost:3000/auth/callback'
      }
    });
    return data;
  }
}
