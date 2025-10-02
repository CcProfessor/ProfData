import { Controller, Post, Patch, Get, Param, Body, Req } from '@nestjs/common';
import { TargetService } from './target.service';
import {
  CreateTargetDto,
  EnterTargetDto,
  InitStatusDto,
} from '../../rules/interfaces/target.interfaces';
import { EnterTargetDto as ClientDto } from '../../rules/interfaces/client.interface';
import { type Request } from 'express';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt.guard';

export class EnterTargetRequestDto {
  dto!: EnterTargetDto;
  secret!: ClientDto;
}

@Controller('target')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  // 1 - newTarget
  // @UseGuards(JwtAuthGuard)
  @Post('new')
  async newTarget(@Body() dto: CreateTargetDto) {
    console.log('Ta na função newTarget do controller');
    console.log('Controller target with DTO:', dto);
    const resp = await this.targetService.newTarget(dto);
    console.log('Response:', resp);
    return resp;
  }

  // 2 - enterTarget
  @Patch('access/:id')
  async enterTarget(
    @Param('id') id: string,
    @Body() body: EnterTargetDto,
    @Req() req: Request,
  ) {
    console.log('Ta na função EnterTarget do controller');
    console.log('Body do enterTarget:', body);
    console.log('Simplificação:', body.name, body.info);
    
    return await this.targetService.enterTarget(id, body, req);
  }

  // 3 - initStatus
  @Patch('init/:id')
  async initStatus(@Param('id') id: string, @Body() dto: InitStatusDto) {
    return await this.targetService.initStatus(id, dto);
  }

  // 4 - detailTarget
  // @UseGuards(JwtAuthGuard)
  @Get('detail/:id')
  async detailTarget(@Param('id') id: string) {
    return await this.targetService.detailTarget(id);
  }

  // 5 - getAll
  @Get('findall')
  async getAll() {
    return await this.targetService.getAll();
  }

  // 6 - getByPlayer
  // @UseGuards(JwtAuthGuard)
  @Get('player/:id')
  async getByPlayer(@Param('id') playerId: string) {
    return await this.targetService.getByPlayer(playerId);
  }

  // 7 - getTargetIdsByPlayer
  // @UseGuards(JwtAuthGuard)
  @Get('player/:id/ids')
  async getTargetIdsByPlayer(@Param('id') playerId: string) {
    return await this.targetService.getTargetIdsByPlayer(playerId);
  } 

  // 8 - updatePage
  // @UseGuards(JwtAuthGuard)
  @Patch('targetPage/:id/')
  async updatePage(@Param('id') targetId: string, @Body() page: number) {
    return await this.targetService.updatePage(targetId, page);
  }
  
}
