import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { PlayerModule } from './player/player.module';
import { TargetModule } from './target/target.module';
import { CodesModule } from './codes/codes.module';

@Module({
  imports: [
    PrismaModule,
    PlayerModule,
    TargetModule,
    CodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
