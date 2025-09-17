// server/src/applications/player/player.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './interfaces/create-player.dto';
import { UpdatePlayerDto } from './interfaces/update-player.dto';
import { PlayerRepository } from './repository/player.repository';
import { Player } from '@domain/player';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepo: PlayerRepository) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerRepo.create(createPlayerDto.username, createPlayerDto.password);
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
    const updated = await this.playerRepo.update(id, updatePlayerDto.username, updatePlayerDto.password);
    if (!updated) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const removed = await this.playerRepo.remove(id);
    if (!removed) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
  }
}
