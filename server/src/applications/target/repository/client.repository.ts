import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Target } from '../../../rules/domain/target';

@Injectable()
export class TargetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Target | null> {
    return this.prisma.target.findUnique({
      where: { id },
    });
  }

  async update(target: Target): Promise<Target> {
    return this.prisma.target.update({
      where: { id: target.id },
      data: {
        name: target.name,
        info: target.info,
        details: target.details,
        link: target.link,
        status: target.status,
        page: target.page,
        updated_at: new Date(),
      },
    });
  }
}
