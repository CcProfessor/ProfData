import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PlayerService } from '../player/player.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const player = await this.playerService.login(username, password);
    if (!player) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: player.id,
      access: player.access,
      createdAt: player.created_at,
    };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      player: {
        id: player.id,
        username: player.username,
        access: player.access,
      },
    };
  }

  async targetLogin() {}
}
