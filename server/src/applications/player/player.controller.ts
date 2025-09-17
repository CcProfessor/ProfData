// server/src/applications/player/player.controller.ts
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto, UpdatePlayerDto } from './interfaces/player.interfaces';
import { Player } from 'src/rules/domain/player';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.create(createPlayerDto);
  }

  @Post('login')
  login(@Body() dto: { username: string; password: string }) {
    return this.playerService.login(dto.username, dto.password);
  }

  @Get()
  findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player> {
    return this.playerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playerService.update(id, updatePlayerDto);
  }
}
