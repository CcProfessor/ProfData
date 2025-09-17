import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { TargetRepository } from './repository/target.repository';
import { Target } from 'src/rules/domain/target';

@Module({
  controllers: [TargetController],
  providers: [
    TargetService,
    TargetRepository,
    Target,
  ],
  exports: [
    TargetService,
    TargetRepository,
  ]
})
export class TargetModule {}
