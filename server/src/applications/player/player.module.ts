import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './repository/player.repository';
import { TargetService } from '../target/target.service';
import { CodesService } from '../codes/codes.service';
import { TargetRepository } from '../target/repository/target.repository';
import { CodesRepository } from '../codes/repository/codes.repository';

@Module({
  controllers: [PlayerController],
  providers: [
    PlayerService,
    PlayerRepository,
    TargetService,
    TargetRepository,
    CodesService,
    CodesRepository,
  ],
})
export class PlayerModule {}
