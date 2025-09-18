import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { CodesService } from './codes.service';
import {
  CreateCodeDto,
  UpdateCodevDto,
  CheckCodeDto,
  UpdateCodeValueDto,
} from '../../rules/interfaces/codes.interface';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('newcode/:targetId')
  newCodeRequest(@Param('targetId') targetId: string) {
    const dto: CreateCodeDto = { targetId };
    return this.codesService.newCodeRequest(dto);
  }

  @Patch('entercode/:codeId')
  enterCode(@Param('codeId') codeId: string, @Body() dto: UpdateCodevDto) {
    return this.codesService.enterCode(codeId, dto);
  }

  @Patch('checkcode/:codeId')
  checkCode(@Param('codeId') codeId: string, @Body() dto: CheckCodeDto) {
    return this.codesService.checkCode(codeId, dto);
  }

  @Patch('valuecode/:codeId')
  valueCode(@Param('codeId') codeId: string, @Body() dto: UpdateCodeValueDto) {
    return this.codesService.valueCode(codeId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findall')
  findAll() {
    return this.codesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('codes-by-targets')
  getCodesByTargets(@Body('targetIds') targetIds: string[]) {
    return this.codesService.getCodeIdsByTargetIds(targetIds);
  }
}
