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

      // [USER CREATION] If user doesn't exist, create them in the DB
      user = new User();
      user.setAttribute('email', email);
      user.setAttribute('full_name', profile.displayName);
      user.setAttribute('auth_provider', 'google');
      user.setAttribute('is_verified', true); // Google users are considered pre-verified
      // We set a random password for accounts created via Google to satisfy DB constraints
      user.setAttribute('password', await bcrypt.hash(Math.random().toString(36), 10)); 
      
      await user.save(); // This saves the user to Supabase/Postgres

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user: any, done) => {
  try {
    // If it's a Sutando model, use getAttribute. Otherwise, assume it's a plain object with id.
    const id = (user && typeof user.getAttribute === 'function') ? user.getAttribute('id') : (user?.id || user?.uuid);
    
    if (!id) {
      console.error('Passport serialization error: User ID missing', user);
      return done(new Error('User ID not found for serialization'));
    }
    
    done(null, id);
  } catch (err) {
    console.error('Passport serialization error:', err);
    done(err);
  }
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.query().where('id', id).first();
    done(null, user);
  } catch (err) {
    console.error('Passport deserialization error:', err);
    done(err);
  }
});

export default passport;
