import { Injectable, NotFoundException } from '@nestjs/common';
import { CodesRepository } from './repository/codes.repository';
import { Code } from 'src/rules/domain/codes';
import {
  CreateCodeDto,
  UpdateCodeValueDto,
  UpdateCodevDto,
  CheckCodeDto,
} from '../../rules/interfaces/codes.interface';

@Injectable()
export class CodesService {
  constructor(private readonly codesRepo: CodesRepository) {}

  async newCodeRequest(dto: CreateCodeDto): Promise<Code> {
    return this.codesRepo.create(dto.targetId);
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
