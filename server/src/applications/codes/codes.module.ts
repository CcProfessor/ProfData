import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { Code } from 'src/rules/domain/codes';

@Module({
  controllers: [CodesController],
  providers: [
    CodesService,
    Code,
  ],
})
export class CodesModule {}
