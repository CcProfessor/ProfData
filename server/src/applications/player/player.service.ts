// server/src/applications/player/player.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerRepository } from './repository/player.repository';
import { Player } from '../../rules/domain/player';
import { CreatePlayerDto, UpdatePlayerDto } from '../../rules/interfaces/player.interfaces';
import { TargetService } from '../target/target.service';
import { CodesService } from '../codes/codes.service';

@Injectable()
export class PlayerService {
  constructor(
    private readonly playerRepo: PlayerRepository,
    private readonly targetService: TargetService,
    private readonly codesService: CodesService,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerRepo.create(
      createPlayerDto.username,
      createPlayerDto.password,
    );
  }

  async login(username: string, password: string): Promise<Player> {
    const players = await this.playerRepo.findAll();
    const player = players.find(
      (p) => p.username === username && p.password === password,
    );

    if (!player) {
      throw new NotFoundException(`Invalid credentials`);
    }

    return player;
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepo.findAll();
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerRepo.findById(id);
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const updated = await this.playerRepo.update(
      id,
      updatePlayerDto,
    );
    if (!updated) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return updated;
  }

  // =============

  async createTarget(playerId: string, page: number = 0) {
    return this.targetService.newTarget({ playerId, page });
  }

  async getPlayerTargets(playerId: string) {
    return this.targetService.getByPlayer(playerId);
  }

  async getTargetIds(playerId: string): Promise<string[]> {
    return this.targetService.getTargetIdsByPlayer(playerId);
  }

  async getPlayerCodes(playerId: string): Promise<string[][]> {
    const targetIds = await this.getTargetIds(playerId);
    return this.codesService.getCodeIdsByTargetIds(targetIds);
  }
}
