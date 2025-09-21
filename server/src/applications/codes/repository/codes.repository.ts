import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Code } from '../../../rules/domain/codes';
import { uuidv7 } from 'uuidv7';
import { CodesMapper } from '../../../rules/mappers/codes.mapper';

@Injectable()
export class CodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(targetId: string): Promise<Code> {
    const created = await this.prisma.code.create({
      data: {
        id: uuidv7(),
        targetId,
        status: 0,
      },
    });
    return CodesMapper.toDomain(created);
  }

  async findAll(): Promise<Code[]> {
    const list = await this.prisma.code.findMany();
    return list.map((item) => CodesMapper.toDomain(item));
  }
  
  async findById(id: string): Promise<Code | null> {
    const found = await this.prisma.code.findUnique({ where: { id } });
    return found ? CodesMapper.toDomain(found) : null;
  }

  async update(id: string, data: Partial<Code>): Promise<Code> {
    const updated = await this.prisma.code.update({
      where: { id },
      data,
    });
    return CodesMapper.toDomain(updated);
  }

  async findCodeIdsByTargetIds(targetIds: string[]): Promise<string[][]> {
    const result: string[][] = [];

    for (const targetId of targetIds) {
      const codes = await this.prisma.code.findMany({
        where: { targetId },
        select: { id: true },
      });
      result.push(codes.map((c) => c.id));
    }

    return result;
  }
}
