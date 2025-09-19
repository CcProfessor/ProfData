import { Module } from '@nestjs/common';
import { Zetasys } from './zetasys';
import { conx } from './conx';
import { PrismaService } from '../prisma/prisma.service';
import { PlayerService } from '../player/player.service';
import { PlayerRepository } from '../player/repository/player.repository';

@Module({
  controllers: [conx],
  providers: [
    Zetasys,
    PrismaService,
    PlayerService,
    PlayerRepository,
  ],
})
export class Molsys {}
