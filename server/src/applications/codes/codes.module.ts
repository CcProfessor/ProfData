import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { CodesRepository } from './repository/codes.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PlayerGateway } from '../../gateways/player.gateway';
import { TargetGateway } from 'applications/gateways/target.gateway';

@Module({
  controllers: [CodesController],
  providers: [
    CodesService, CodesRepository, PrismaService,
    PlayerGateway, TargetGateway,
  ],
  exports: [CodesService], // 👈 exporta para PlayerModule
})
export class CodesModule {}
