import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PlayerRepository } from './repository/player.repository';

@Module({
  controllers: [PlayerController],
  providers: [
    PlayerService,
    PlayerRepository,
  ],
})
export class PlayerModule {}
