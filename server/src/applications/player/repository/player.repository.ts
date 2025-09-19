import { Injectable } from '@nestjs/common';
import { Player } from 'src/rules/domain/player';
import { PrismaService } from 'src/applications/prisma/prisma.service';
import { uuidv7 } from 'uuidv7';


@Injectable()
export class PlayerRepository {
  constructor(private readonly prisma: PrismaService) {}
  // private players: Player[] = [];

  async create(username: string, password: string) {
    return this.prisma.player.create({
      data: {
        username,
        password,
        access: 0,
      },
    });
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

  async findAll() {
    return this.prisma.player.findMany();
  }

  async findById(id: string) {
    return this.prisma.player.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<Player>) {
    return this.prisma.player.update({
      where: { id },
      data,
    });
  }
  
}
