// target-jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type TargetJwtPayload = { sub: string; playerId: string };

@Injectable()
export class TargetJwtStrategy extends PassportStrategy(Strategy, 'target-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TARGET_JWT_SECRET || 'super_secret_target_key',
    });
  }

  async validate(payload: TargetJwtPayload) {
    if (!payload.sub) {
      throw new UnauthorizedException('Token inválido');
    }

    return {
      targetId: payload.sub,
      playerId: payload.playerId,
    };
  }
}
