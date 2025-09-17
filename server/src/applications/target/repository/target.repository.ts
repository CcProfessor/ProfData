// server/src/applications/target/repository/target.repository.ts
import { Injectable } from '@nestjs/common';
import { Target } from 'src/rules/domain/target';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class TargetRepository {
  private targets: Target[] = [];

  async create(playerId: string, page: number = 0): Promise<Target> {
    const target = new Target(uuidv7(), playerId, page);
    this.targets.push(target);
    return target;
  }

  async findAll(): Promise<Target[]> {
    return this.targets;
  }

  async findById(id: string): Promise<Target | undefined> {
    return this.targets.find((t) => t.id === id);
  }

  async findByPlayer(playerId: string): Promise<Target[]> {
    return this.targets.filter((t) => t.playerId === playerId);
  }

  async update(target: Target): Promise<Target> {
    const index = this.targets.findIndex((t) => t.id === target.id);
    if (index !== -1) {
      this.targets[index] = target;
    }
    return target;
  }
}
