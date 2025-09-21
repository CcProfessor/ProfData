import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PlayerModule } from '../player/player.module'; // 👈 importa corretamente
import { TargetModule } from '../target/target.module';

@Module({
  imports: [
    forwardRef(() => PlayerModule), // 👈 evita ciclo
    TargetModule,                   // 👈 necessário para TargetService
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
