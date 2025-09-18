import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PlayerService } from '../player/player.service';
import { PlayerRepository } from '../player/repository/player.repository';
import { TargetService } from '../target/target.service';
import { TargetRepository } from '../target/repository/target.repository';
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
  providers: [
    AuthService,
    PlayerService,
    PlayerRepository,
    TargetService,
    TargetRepository,
    JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
