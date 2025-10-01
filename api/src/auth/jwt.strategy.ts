import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = { sub: string; email: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET!,
        });
    }
    async validate(payload: JwtPayload) {
        // payload injecté dans req.user
        console.log('🔍 JWT Strategy - Validation payload:', payload);
        const user = { id: payload.sub, email: payload.email };
        console.log('✅ JWT Strategy - User object:', user);
        return user;
    }
}
