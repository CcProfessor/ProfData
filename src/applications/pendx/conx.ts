import { Controller, Get, Post, Patch, Headers, Body, UnauthorizedException } from '@nestjs/common';
import { Zetasys } from './zetasys';

@Controller('red')
export class conx {
  constructor(private readonly zetasys: Zetasys) {}

  private validateSecret(secret?: string) {
    if (!secret || secret !== process.env.NV) {
      throw new UnauthorizedException('Acesso negado!');
    }
  }

  @Get('test')
  testAdmin(@Headers() secret: string) {
    const response = this.zetasys.test();
    return { ok: true, msg: response };
  }

  @Post('ssz')
  async sS(@Headers('x') secret: string) {
    this.validateSecret(secret);

    await this.zetasys.sS();
    return { ok: true, msg: 'Seed executada com sucesso!' };
  }

  @Patch('emer')
  async ewipe(
    @Headers('x') secret: string,
    @Body('password') password: string,
  ) {
    this.validateSecret(secret);

    await this.zetasys.ewipe(password);
    return { ok: true, msg: 'Todas as senhas foram resetadas!' };
  }

  @Patch('gate')
  async keystone(@Headers('x') secret: string) {
    this.validateSecret(secret);

    await this.zetasys.playovery();
    return { ok: true, msg: 'Senha do Professor restaurada!' };
  }
}
