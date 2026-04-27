import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0].value;
      if (!email) return done(new Error('No email found from Google'));

      let user = await User.query().where('email', email).first();

      if (user) {
        if (user.getAttribute('auth_provider') === 'manual') {
            return done(null, false, { message: 'This account was created with email/password. Please login manually.' });
        }
        return done(null, user);
      }

      // Create new user if not exists
      user = new User();
      user.setAttribute('email', email);
      user.setAttribute('full_name', profile.displayName);
      user.setAttribute('auth_provider', 'google');
      user.setAttribute('is_verified', true); // Google is pre-verified
      user.setAttribute('password', await bcrypt.hash(Math.random().toString(36), 10)); // dummy password
      await user.save();

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.getAttribute('id'));
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.query().where('id', id).first();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
