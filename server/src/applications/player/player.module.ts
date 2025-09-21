import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './repository/player.repository';
import { TargetModule } from '../target/target.module';
import { CodesModule } from '../codes/codes.module';
import { AuthModule } from '../auth/auth.module';
import { TargetService } from '../target/target.service';
import { CodesService } from '../codes/codes.service';
import { TargetRepository } from '../target/repository/target.repository';
import { CodesRepository } from '../codes/repository/codes.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    TargetModule,
    CodesModule,
  ],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    PlayerRepository,
    // TargetService,
    // TargetRepository,
    // CodesRepository,
    // CodesService,
    PrismaService,
  ],
})
export class PlayerModule {}
