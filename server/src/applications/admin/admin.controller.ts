import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('test')
  testAdmin() {
    console.log('A rota admin ta funcionando');
    const response = this.adminService.test();
    const final = "A rota admin ta funcionando";
    console.log('Service: ', response)
    console.log('Controller: ', final)
    return "ok";
  }
}
