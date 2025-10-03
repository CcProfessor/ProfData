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
import { TargetGateway } from '../../gateways/target.gateway';

@Injectable()
export class CodesService {
  constructor(
    private readonly codesRepo: CodesRepository,
    private readonly playerGateway: PlayerGateway,
    private readonly targetGateway: TargetGateway,
  ) {}

  async newCodeRequest(dto: CreateCodeDto): Promise<Code> {
    console.log('Service do newCode com DTO: ', dto);

    const created = await this.codesRepo.create(dto.targetId);

    // 🔹 Dispara evento "newCode" via socket
    this.playerGateway.emitNewCode(dto.targetId, created.id);

    console.log('Created: ', created);
    console.log('TargetId: ', dto.targetId);

    return created;
  }

  async enterCode(codeId: string, dto: UpdateCodevDto): Promise<Code> {
    console.log('Service do enterCode com DTO: ', dto);

    const code = await this.codesRepo.findById(codeId);
    if (!code) throw new NotFoundException(`Code ${codeId} not found`);

    const updated = await this.codesRepo.update(codeId, { codev: dto.codev });

    // 🔹 Dispara evento via socket
    console.log('Evento Socket sendo disparado no EnterCode: ',
      {
        targetId: updated.targetId,
        codeId,
        codev: dto.codev,
      }
    )
    this.targetGateway.emitCodeResponse({
      targetId: updated.targetId,
      codeId,
      codev: dto.codev,
    });

    console.log('Updated: ', updated);

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
