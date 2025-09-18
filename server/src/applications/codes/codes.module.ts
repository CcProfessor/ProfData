import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { Code } from 'src/rules/domain/codes';
import { CodesRepository } from './repository/codes.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CodesController],
  providers: [
    CodesService,
    Code,
  ],
  exports: [
    CodesService,
    CodesRepository
  ]
})
export class CodesModule {}
