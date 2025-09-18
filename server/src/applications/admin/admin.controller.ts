import { Controller, Get, Post, Patch, Headers, Body, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('red-button')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private validateSecret(secret?: string) {
    if (!secret || secret !== process.env.NV) {
      throw new UnauthorizedException('Acesso negado!');
    }
  }

  @Get('test')
  testAdmin(@Headers() secret: string) {
    const response = this.adminService.test();
    return { ok: true, msg: response };
  }

  @Post('start-seed')
  async startSeed(@Headers('x') secret: string) {
    this.validateSecret(secret);

    await this.adminService.startSeed();
    return { ok: true, msg: 'Seed executada com sucesso!' };
  }

  @Patch('emergency')
  async emergency(
    @Headers('x') secret: string,
    @Body('password') password: string,
  ) {
    this.validateSecret(secret);

    await this.adminService.emergency(password);
    return { ok: true, msg: 'Todas as senhas foram resetadas!' };
  }

  @Patch('recovery')
  async recovery(@Headers('x') secret: string) {
    this.validateSecret(secret);

    await this.adminService.recovery();
    return { ok: true, msg: 'Senha do Professor restaurada!' };
  }
}
