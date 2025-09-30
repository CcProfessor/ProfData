import { Injectable, NotFoundException } from '@nestjs/common';
import { CodesRepository } from './repository/codes.repository';
import { Code } from '../../rules/domain/codes';
import {
  CreateCodeDto,
  UpdateCodeValueDto,
  UpdateCodevDto,
  CheckCodeDto,
} from '../../rules/interfaces/codes.interface';
import { PlayerGateway } from '../../gateways/player.gateway';

@Injectable()
export class CodesService {
  constructor(
    private readonly codesRepo: CodesRepository,
    private readonly playerGateway: PlayerGateway,
  ) {}

  async newCodeRequest(dto: CreateCodeDto): Promise<Code> {
    const created = await this.codesRepo.create(dto.targetId);

    const tId = dto.targetId.toString();
    const payload = { targetId: tId, codeId: created.id };

    // 🔹 Dispara evento "newCode" via socket
    this.playerGateway.handleNewCode(tId, created.id);

    return created;
  }

  async enterCode(codeId: string, dto: UpdateCodevDto): Promise<Code> {
    const code = await this.codesRepo.findById(codeId);
    if (!code) throw new NotFoundException(`Code ${codeId} not found`);

    return this.codesRepo.update(codeId, { codev: dto.codev });
  }

  async checkCode(codeId: string, dto: CheckCodeDto): Promise<Code> {
    const code = await this.codesRepo.findById(codeId);
    if (!code) throw new NotFoundException(`Code ${codeId} not found`);

    const status = dto.isValid ? 1 : 2;
    return this.codesRepo.update(codeId, { status, updated_at: new Date() });
  }

  async valueCode(codeId: string, dto: UpdateCodeValueDto): Promise<Code> {
    const code = await this.codesRepo.findById(codeId);
    if (!code) throw new NotFoundException(`Code ${codeId} not found`);

    return this.codesRepo.update(codeId, { value: dto.value, updated_at: new Date() });
  }

  async findAll(): Promise<Code[]> {
    return this.codesRepo.findAll();
  }

  async findOne(id: string): Promise<Code> {
    const code = await this.codesRepo.findById(id);
    if (!code) throw new NotFoundException(`Code ${id} not found`);
    return code;
  }

  async getCodeIdsByTargetIds(targetIds: string[]): Promise<string[][]> {
    return this.codesRepo.findCodeIdsByTargetIds(targetIds);
  }
}
