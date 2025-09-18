import { Injectable } from '@nestjs/common';
import { PlayerRepository } from '../player/repository/player.repository';
import * as dotenv from 'dotenv';

dotenv.config();

const nP = process.env.RECOV;
const sO = process.env.SO;
const sD = process.env.SD;

@Injectable()
export class Zetasys {
  constructor(private readonly player: PlayerRepository) {}
  test() {
    return 'A rota Admin ta funcionando! E o Service tbm';
  }

  async sS() {
    const players = [
      {
        username: 'Professor',
        password: sO || 'alpha',
        access: 4,
      },
      {
        username: 'Rolex',
        password: sD || 'MTgp',
        access: 1,
      },
    ];

    players.forEach(async (el) => {
      await this.player.start(el.username, el.password, el.access)
    });
  }

  async ewipe(password: string) {
    const list = await this.player.findAll();
    list.forEach(async (el) => {
      await this.player.update(el.id, { password, access: 0 })
    });
  }

  async playovery() {
    const list = await this.player.findAll();
    const target = list.filter((elem) => elem.username === 'Professor');
    const { id } = target[0];
    this.player.update(id, { password: nP })
  }
}
