import { Module } from '@nestjs/common';
import { Zetasys } from './zetasys';
import { conx } from './conx';

@Module({
  controllers: [conx],
  providers: [Zetasys],
})
export class Molsys {}
