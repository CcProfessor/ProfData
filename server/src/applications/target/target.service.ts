import { Injectable, NotFoundException } from '@nestjs/common';
import { TargetRepository } from './repository/target.repository';
import { ClientRepository } from './repository/client.repository';
import { Target } from 'src/rules/domain/target';
import {
  CreateTargetDto,
  EnterTargetDto,
  InitStatusDto,
} from '../../rules/interfaces/target.interfaces';
import { ClientTargetDto as ClientDto } from 'src/rules/interfaces/client.interface';
import { Request } from 'express';

@Injectable()
export class TargetService {
  constructor(
    private readonly targetRepo: TargetRepository,
    private readonly clientRepo: ClientRepository,
  ) {}

  async newTarget(dto: CreateTargetDto): Promise<Target> {
    // const targetC = 
    return this.targetRepo.create(dto.playerId, dto.page ?? 0);
    // const clientReq = this.clientRepo.create(targetC.Id);
    // return targetC;
  }

  async enterTarget(
  id: string,
  dto: EnterTargetDto,
  secret: ClientDto,
  req: Request,
): Promise<Target> {
  const target = await this.targetRepo.findById(id);
  if (!target) throw new NotFoundException(`Target ${id} not found`);

  return this.targetRepo.update(id, {
    name: dto.name,
    info: dto.info,
  });
}

  async initStatus(id: string, dto: InitStatusDto): Promise<Target> {
  const target = await this.targetRepo.findById(id);
  if (!target) throw new NotFoundException(`Target ${id} not found`);

  return this.targetRepo.update(id, {
    status: dto.success ? 1 : 2,
  });
}

  async detailTarget(id: string): Promise<Target> {
    const target = await this.targetRepo.findById(id);
    if (!target) throw new NotFoundException(`Target ${id} not found`);
    return target;
  }

  async updatePage(id: string, page: number) {
    const target = await this.targetRepo.findById(id);
    if (!target) throw new NotFoundException(`Target ${id} not found`);
    target.page = page;
    return target;
  }

  // =======

  async getAll(): Promise<Target[]> {
    return this.targetRepo.findAll();
  }

  async getByPlayer(playerId: string): Promise<Target[]> {
    return this.targetRepo.findByPlayer(playerId);
  }

  async getTargetIdsByPlayer(playerId: string): Promise<string[]> {
    return this.targetRepo.findTargetIdsByPlayer(playerId);
  }
}
