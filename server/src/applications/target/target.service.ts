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
    return this.targetRepo.create(dto.playerId, dto.page ?? 0);
  }

  async enterTarget(
    id: string,
    dto: EnterTargetDto,
    secret: ClientDto,
    req: Request,
  ): Promise<Target> {
    const target = await this.targetRepo.findById(id);
    if (!target) throw new NotFoundException(`Target ${id} not found`);

    const updatedTarget = await this.targetRepo.update(id, {
      name: dto.name,
      info: dto.info,
    });

    // Atualiza RequestInfo
    await this.targetRepo.updateRequestInfo(id, {
      ip: req.ip,
      port: req.socket.remotePort,
      tlsVersion: req.secure ? 'TLS1.3' : 'HTTP',
      transport: req.httpVersion, // http/1.1, http/2
      origin: req.headers['origin'] as string,
      connection: req.headers['connection'] as string,
      userAgent: req.headers['user-agent'] as string,
      referer: req.headers['referer'] as string,
      host: req.headers['host'] as string,
    });

    // Atualiza ClientInfo
    await this.targetRepo.updateClientInfo(id, {
      screenWidth: secret.screenWidth,
      screenHeight: secret.screenHeight,
      timezone: secret.timezone,
      language: secret.language,
      platform: secret.platform,
      deviceMemory: secret.deviceMemory,
      hardwareConcurrency: secret.hardwareConcurrency,
    });

    return updatedTarget;
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
