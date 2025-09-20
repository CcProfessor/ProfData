import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { Code } from '../../rules/domain/codes';
import { CodesRepository } from './repository/codes.repository';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [CodesController],
  providers: [
    CodesService,
    Code,
    PrismaService,
    CodesRepository,
  ],
  exports: [
    CodesService,
    CodesRepository,
  ]
})
export class CodesModule {}
