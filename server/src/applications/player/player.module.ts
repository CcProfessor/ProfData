import { Module, forwardRef } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './repository/player.repository';
import { TargetModule } from '../target/target.module';
import { CodesModule } from '../codes/codes.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';
import { TargetGateway } from '../../gateways/target.gateway';
import { PlayerGateway } from '../../gateways/player.gateway';

@Module({
  imports: [
    forwardRef(() => AuthModule), // 👈 evita ciclo direto
    TargetModule,
    CodesModule,
  ],
  controllers: [PlayerController],
  providers: [
    PlayerService, PlayerRepository, PrismaService,
    TargetGateway, PlayerGateway,
  ],
  exports: [PlayerService], // 👈 exporta para AuthModule usar
})
export class PlayerModule {}
