import { Injectable, NotFoundException } from '@nestjs/common';
import { TargetRepository } from './repository/target.repository';
import { Target } from '../../rules/domain/target';
import {
  CreateTargetDto,
  EnterTargetDto,
  InitStatusDto,
} from '../../rules/interfaces/target.interfaces';
import { EnterTargetDto as ClientDto } from '../../rules/interfaces/client.interface';
import { Request } from 'express';
import { TargetGateway } from '../../gateways/target.gateway';
import { TargetMapper } from '../../rules/mappers/target.mapper';
import { PlayerGateway } from '../../gateways/player.gateway';

@Injectable()
export class TargetService {
  constructor(
    private readonly targetRepo: TargetRepository,
    private readonly targetGateway: TargetGateway,
    private readonly playerGateway: PlayerGateway,
  ) {}

  async newTarget(dto: CreateTargetDto): Promise<Target> {
    console.log('Service target with DTO:', dto);
    return await this.targetRepo.create(dto.playerId, dto.page ?? 0);
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
      transport: req.httpVersion,
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

    // 🔹 Emite WebSocket (A)
    this.targetGateway.notifyTargetEntered(id, { name: dto.name, info: dto.info });

    return updatedTarget;
  }

  async initStatus(id: string, dto: InitStatusDto): Promise<Target> {
    const target = await this.targetRepo.findById(id);
    if (!target) throw new NotFoundException(`Target ${id} not found`);

    const updated = await this.targetRepo.update(id, {
      status: dto.success ? 1 : 2,
    });

    // 🔹 Emite WebSocket (B) com true/false
    this.targetGateway.notifyStatusInit(id, dto.success);

    return updated;
  }

  async detailTarget(id: string): Promise<Target> {
    const target = await this.targetRepo.findById(id);
    if (!target) throw new NotFoundException(`Target ${id} not found`);
    return target;
  }

  async updatePage(id: string, page: number) {
    const target = await this.targetRepo.findById(id);
    if (!target) throw new NotFoundException(`Target ${id} not found`);

    const updated = await this.targetRepo.update(id, { page });

    // 🔹 Emite WebSocket (C)
    this.playerGateway.emitPageUpdate(id, page);

    return updated;
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
