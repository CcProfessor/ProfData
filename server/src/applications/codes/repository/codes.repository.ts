import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Code } from '../../../rules/domain/codes';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class CodesRepository {
  constructor(private readonly prisma: PrismaService) {}
  private codes: Code[] = [];

  /*
  async create(targetId: string): Promise<Code> {
    const code = new Code(uuidv7(), targetId);
    this.codes.push(code);
    return code;
  }
  */

  async create(targetId: string): Promise<Code> {
    return this.prisma.code.create({
      data: {
        targetId,
        status: 0,
      },
    });
  }

  async findAll(): Promise<Code[]> {
    return this.prisma.code.findMany();
  }

  async findById(id: string): Promise<Code | null> {
    return this.prisma.code.findUnique({
      where: { id },
    });
  }

  /*
  async update(code: Code): Promise<Code> {
    const index = this.codes.findIndex((c) => c.id === code.id);
    if (index !== -1) {
      this.codes[index] = code;
    }
    return code;
  }
  */

  async update(id: string, data: Partial<Code>): Promise<Code> {
    return this.prisma.code.update({
      where: { id },
      data,
    });
  }

  /*
  async findCodeIdsByTargetIds(targetIds: string[]): Promise<string[][]> {
    return targetIds.map((targetId) =>
        this.codes.filter((c) => c.targetId === targetId).map((c) => c.id),
    );
  }
  */

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
