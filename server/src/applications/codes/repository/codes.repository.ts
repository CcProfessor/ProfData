import { Injectable } from '@nestjs/common';
import { Code } from 'src/rules/domain/codes';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class CodesRepository {
  private codes: Code[] = [];

  async create(targetId: string): Promise<Code> {
    const code = new Code(uuidv7(), targetId);
    this.codes.push(code);
    return code;
  }

  async findAll(): Promise<Code[]> {
    return this.codes;
  }

  async findById(id: string): Promise<Code | undefined> {
    return this.codes.find((c) => c.id === id);
  }

  async update(code: Code): Promise<Code> {
    const index = this.codes.findIndex((c) => c.id === code.id);
    if (index !== -1) {
      this.codes[index] = code;
    }
    return code;
  }
}
