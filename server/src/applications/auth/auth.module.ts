import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PlayerService } from '../player/player.service';
import { PlayerRepository } from '../player/repository/player.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret_key', // 🔑 segredo do token
      signOptions: { expiresIn: '1h' }, // token expira em 1h
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PlayerService, PlayerRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
