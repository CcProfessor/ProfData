import { Controller, Post, Patch, Get, Param, Body, Req } from '@nestjs/common';
import { TargetService } from './target.service';
import {
  CreateTargetDto,
  EnterTargetDto,
  InitStatusDto,
} from '../../rules/interfaces/target.interfaces';
import { ClientTargetDto as ClientDto } from 'src/rules/interfaces/client.interface';
import { Request } from 'express';

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
  enterTarget(
    @Param('id') id: string,
    @Body() dto: EnterTargetDto,
    @Body() secret: ClientDto,
    @Req() req: Request,
  ) {
    return this.targetService.enterTarget(id, dto, secret, req);
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

  // 8 - updatePage
  @Patch('targetPage/:id/')
  updatePage(@Param('id') targetId: string, @Body() page: number) {
    return this.targetService.updatePage(targetId, page);
  }
  
}
