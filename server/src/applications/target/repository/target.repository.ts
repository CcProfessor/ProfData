import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Target } from '../../../rules/domain/target';
import { uuidv7 } from 'uuidv7';
import { TargetMapper } from '../../../rules/mappers/target.mapper';

@Injectable()
export class TargetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(playerId: string, page: number = 0): Promise<Target> {
    console.log('Repository target for playerId:', playerId, 'with page:', page);
    const created = await this.prisma.target.create({
      data: {
        name: '',
        info: '',
        page,
        status: 0,
        playerId,

        request: {
          create: {
            id: uuidv7(),
            ip: null,
            port: null,
            tlsVersion: null,
            transport: null,
            origin: null,
            connection: null,
            userAgent: null,
            referer: null,
            host: null,
          },
        },

        client: {
          create: {
            id: uuidv7(),
            screenWidth: null,
            screenHeight: null,
            timezone: null,
            language: null,
            platform: null,
            deviceMemory: null,
            hardwareConcurrency: null,
          },
        },
      },
    });

    return TargetMapper.toDomain(created);
  }

  async findAll(): Promise<Target[]> {
    const found = await this.prisma.target.findMany();
    return found.map(TargetMapper.toDomain);
  }

  async findById(id: string): Promise<Target | null> {
    const found = await this.prisma.target.findUnique({ where: { id } });
    return found ? TargetMapper.toDomain(found) : null;
  }

  async findByPlayer(playerId: string): Promise<Target[]> {
    const found = await this.prisma.target.findMany({ where: { playerId } });
    return found.map(TargetMapper.toDomain);
  }

  async update(id: string, data: Partial<Target>): Promise<Target> {
    console.log('Dentro do Update do Service, o Data: ', data);
    const updated = await this.prisma.target.update({
      where: { id },
      data,
    });
    return TargetMapper.toDomain(updated);
  }

  // ====

  async updateRequestInfo(
    targetId: string,
    data: {
      ip?: string;
      port?: number;
      tlsVersion?: string;
      transport?: string;
      origin?: string;
      connection?: string;
      userAgent?: string;
      referer?: string;
      host?: string;
    },
  ) {
    return this.prisma.requestInfo.update({
      where: { targetId },
      data,
    });
  }

  async updateClientInfo(
    targetId: string,
    data: {
      screenWidth?: number;
      screenHeight?: number;
      timezone?: string;
      language?: string;
      platform?: string;
      deviceMemory?: number;
      hardwareConcurrency?: number;
    },
  ) {
    return this.prisma.clientInfo.update({
      where: { targetId },
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
