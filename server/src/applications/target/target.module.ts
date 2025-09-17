import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { Target } from 'src/rules/domain/target';

@Module({
  controllers: [TargetController],
  providers: [
    TargetService,
    Target,
  ],
})
export class TargetModule {}
