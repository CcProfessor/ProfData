import { Injectable } from '@nestjs/common';
import { Player } from '../../../rules/domain/player';
import { Player as PrismaPlayer } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { PlayerMapper } from '../../../rules/mappers/player.mapper';
import { uuidv7 } from 'uuidv7';


@Injectable()
export class PlayerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(username: string, password: string): Promise<Player> {
    const newPlayer: PrismaPlayer = await this.prisma.player.create({
      data: {
        username,
        password,
        access: 0,
      },
    });
    return PlayerMapper.toDomain(newPlayer);
  }

  async start(username: string, password: string, access: number) {
    return this.prisma.player.create({
      data: {
        username,
        password,
        access,
      },
    });
  }

  async findAll(): Promise<Player[]> {
    const list = await this.prisma.player.findMany();
    return list.map((elem) => PlayerMapper.toDomain(elem));
  }

  async findById(id: string): Promise<Player | null> {
    const player = await this.prisma.player.findUnique({
      where: { id },
    });
    if (!player) return null;
    return PlayerMapper.toDomain(player);
  }

  async update(id: string, data: Partial<Player>): Promise<Player> {
    const player = await this.prisma.player.update({
      where: { id },
      data,
    });
    return PlayerMapper.toDomain(player);
  }
  
}
