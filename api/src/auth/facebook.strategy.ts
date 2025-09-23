import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    const callback = process.env.FACEBOOK_CALLBACK_URL || `${(process.env.APP_BASE_URL || 'http://localhost:3001/api').replace(/\/$/, '')}/auth/facebook/callback`;
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: callback,
      scope: ['email'],
      profileFields: ['id', 'emails', 'name', 'picture'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName || [profile.name?.givenName, profile.name?.familyName].filter(Boolean).join(' ');
    const photo = profile.photos?.[0]?.value;
    
    return {
      provider: 'facebook',
      providerId: profile.id,
      email,
      name,
      avatarUrl: photo,
    };
  }
}
