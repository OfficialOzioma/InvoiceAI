export class AuthService {
  static async signup(email: string, password?: string, fullName?: string) {
    console.log('Mock signup', email);
    return { user: { id: 'mock-user-id', email, user_metadata: { full_name: fullName } } };
  }

  static async verifyOtp(email: string, token: string) {
    console.log('Mock verifyOtp', email, token);
    return { 
      user: { id: 'mock-user-id', email },
      session: { access_token: 'mock_access_token', refresh_token: 'mock_refresh_token' }
    };
  }

  static async login(email: string, password: string) {
    console.log('Mock login', email);
    return { 
      user: { id: 'mock-user-id', email },
      session: { access_token: 'mock_access_token', refresh_token: 'mock_refresh_token' }
    };
  }

  static async resetPassword(email: string) {
    console.log('Mock resetPassword', email);
    return true;
  }

  static async exchangeCodeForSession(code: string) {
    return { session: { access_token: 'mock_access_token', refresh_token: 'mock_refresh_token' } };
  }

  static async getGoogleOAuthUrl(host: string) {
    return { url: '/auth/callback?code=mock_google_code' };
  }

  static async getUserByToken(token: string) {
    return { data: { user: { id: 'mock-user-id', email: 'mock@example.com' } }, error: null };
  }
}

