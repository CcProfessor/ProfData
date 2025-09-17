// server/src/applications/player/repository/player.repository.ts
import { Injectable } from '@nestjs/common';
import { Player } from 'src/rules/domain/player';
import { v7 as uuidv7 } from 'uuidv7';

@Injectable()
export class PlayerRepository {
  private players: Player[] = [];

  async create(username: string, password: string): Promise<Player> {
    const player = new Player(uuidv7(), username, password);
    this.players.push(player);
    return player;
  }

  async findAll(): Promise<Player[]> {
    return this.players;
  }

  async findById(id: string): Promise<Player | undefined> {
    return this.players.find((p) => p.id === id);
  }

  async update(id: string, username?: string, password?: string): Promise<Player | undefined> {
    const player = await this.findById(id);
    if (player) {
      player.updateProfile(username, password);
    }
    return player;
  }

  async remove(id: string): Promise<boolean> {
    const index = this.players.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.players.splice(index, 1);
    return true;
  }
}
