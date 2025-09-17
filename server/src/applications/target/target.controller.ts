// server/src/applications/target/target.controller.ts
import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { TargetService } from './target.service';
import { CreateTargetDto, EnterTargetDto, InitStatusDto } from './interfaces/target.interfaces';

@Controller('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  // 1 - newTarget
  @Post('new')
  newTarget(@Body() dto: CreateTargetDto) {
    return this.targetService.newTarget(dto);
  }

  // 2 - enterTarget
  @Patch('access/:id')
  enterTarget(@Param('id') id: string, @Body() dto: EnterTargetDto) {
    return this.targetService.enterTarget(id, dto);
  }

  // 3 - initStatus
  @Patch('init/:id')
  initStatus(@Param('id') id: string, @Body() dto: InitStatusDto) {
    return this.targetService.initStatus(id, dto);
  }

  // 4 - detailTarget
  @Get('detail/:id')
  detailTarget(@Param('id') id: string) {
    return this.targetService.detailTarget(id);
  }

  // 5 - getAll
  @Get('findall')
  getAll() {
    return this.targetService.getAll();
  }

  // 6 - getByPlayer
  @Get('player/:id')
  getByPlayer(@Param('id') playerId: string) {
    return this.targetService.getByPlayer(playerId);
  }

  // 7 - getTargetIdsByPlayer
  @Get('player/:id/ids')
  getTargetIdsByPlayer(@Param('id') playerId: string) {
    return this.targetService.getTargetIdsByPlayer(playerId);
  } 
  
}
