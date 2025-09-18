import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Target } from 'src/rules/domain/target';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class TargetRepository {
  constructor(private readonly prisma: PrismaService) {}
  private targets: Target[] = [];

  /*
  async create(playerId: string, page: number = 0): Promise<Target> {
    const target = new Target(
    uuidv7(),
    "",        // name
    "",        // info
    page,      // page
    0,         // status
    playerId,
    undefined, // link
    undefined, // details
  );
    this.targets.push(target);
    return target;
  } */

  async create(playerId: string, page: number = 0): Promise<Target> {
    return this.prisma.target.create({
      data: {
        playerId,
        page,
        status: 0,
        name: '',
        info: '',
      },
    });
  }

  async findAll(): Promise<Target[]> {
    return this.prisma.target.findMany();
  }

  async findById(id: string): Promise<Target | null> {
    return this.prisma.target.findUnique({
      where: { id },
    });
  }

  async findByPlayer(playerId: string): Promise<Target[]> {
    return this.prisma.target.findMany({
      where: { playerId },
    });
  }

  /*
  async update(target: Target): Promise<Target> {
    const index = this.targets.findIndex((t) => t.id === target.id);
    if (index !== -1) {
      this.targets[index] = target;
    }
    return target;
  }
  */

  async update(id: string, data: Partial<Target>): Promise<Target> {
    return this.prisma.target.update({
      where: { id },
      data,
    });
  }

  // ====

  async findTargetIdsByPlayer(playerId: string): Promise<string[]> {
    const targets = await this.prisma.target.findMany({
      where: { playerId },
      select: { id: true },
    });
    return targets.map((t) => t.id);
  }
  
}
