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

  // ====


  // Criar novo Target para o player
  @Post(':id/target')
  createTarget(@Param('id') playerId: string, @Body('page') page: number) {
    return this.playerService.createTarget(playerId, page ?? 0);
  }

  // Listar Targets do player
  @Get(':id/targets')
  getTargets(@Param('id') playerId: string) {
    return this.playerService.getPlayerTargets(playerId);
  }

  // Obter apenas os targetIds
  @Get(':id/target-ids')
  getTargetIds(@Param('id') playerId: string) {
    return this.playerService.getTargetIds(playerId);
  }

  // Obter todos os codes associados aos targets do player
  @Get(':id/codes')
  getCodes(@Param('id') playerId: string) {
    return this.playerService.getPlayerCodes(playerId);
  }
}
