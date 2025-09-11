import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const callback = process.env.GOOGLE_CALLBACK_URL || `${(process.env.APP_BASE_URL || 'http://localhost:3001/api').replace(/\/$/, '')}/auth/google/callback`;
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: callback,
      scope: ['profile', 'email'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName || [profile.name?.givenName, profile.name?.familyName].filter(Boolean).join(' ');
    const photo = profile.photos?.[0]?.value;
    return {
      provider: 'google',
      providerId: profile.id,
      email,
      name,
      avatarUrl: photo,
    };
  }
}
