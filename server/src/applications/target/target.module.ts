import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { TargetRepository } from './repository/target.repository';
import { Target } from '../../rules/domain/target';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';
import { TargetGateway } from 'applications/applications/gateways/target.gateway';

@Module({
  imports: [AuthModule],
  controllers: [TargetController],
  providers: [
    TargetService,
    TargetRepository,
    Target,
    TargetGateway,
    PrismaService,
  ],
  exports: [
    TargetService,
    TargetRepository,
  ]
})
export class TargetModule {}
