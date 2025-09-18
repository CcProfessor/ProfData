import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super_secret_key',
    });
  }

  async validate(payload: any) {
    // return { userId: payload.sub, username: payload.username };
    if (!payload.sub) throw new UnauthorizedException('Token inválido');

    return {
      userId: payload.sub,
      access: payload.access,
      createdAt: payload.createdAt,
    };
  }
}
