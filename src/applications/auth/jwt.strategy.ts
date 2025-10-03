// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type PlayerJwtPayload = { sub: string; access?: string; createdAt?: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'player-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super_secret_key',
    });
  }

  async validate(payload: PlayerJwtPayload) {
    if (!payload.sub) {
      throw new UnauthorizedException('Token inválido');
    }

    return {
      userId: payload.sub,
      access: payload.access,
      createdAt: payload.createdAt,
    };
  }
}
