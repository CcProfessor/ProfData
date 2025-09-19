import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Target } from 'src/rules/domain/target';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class TargetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(playerId: string, page: number = 0): Promise<Target> {
     const created = await this.prisma.target.create({
      data: {
        name: '',
        info: '',
        page,
        status: 0,
        playerId,

        requestInfo: {
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

        clientInfo: {
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
      include: {
        requestInfo: true,
        clientInfo: true,
      },
    });
    return new Target(
      created.id,
      created.name || '',
      created.info || '',
      created.page,
      created.status,
      created.playerId,
      created.link || '',
      created.details || '',
      // created.createdAt,
      // created.updatedAt,
    );
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

  async update(id: string, data: Partial<Target>): Promise<Target> {
    return this.prisma.target.update({
      where: { id },
      data,
    });
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
