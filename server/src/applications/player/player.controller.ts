import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto, UpdatePlayerDto } from '../../rules/interfaces/player.interfaces';
import { Player } from '../../rules/domain/player';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt.guard';

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

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player> {
    return this.playerService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playerService.update(id, updatePlayerDto);
  }

  // ====


  // Criar novo Target para o player
  // @UseGuards(JwtAuthGuard)
  @Post(':id/target')
  createTarget(@Param('id') playerId: string, @Body('page') page: number) {
    return this.playerService.createTarget(playerId, page ?? 0);
  }

  // Listar Targets do player
  // @UseGuards(JwtAuthGuard)
  @Get(':id/targets')
  getTargets(@Param('id') playerId: string) {
    return this.playerService.getPlayerTargets(playerId);
  }

  // Obter apenas os targetIds
  // @UseGuards(JwtAuthGuard)
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
