import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { PlantModule } from './plant/plant.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [PlantModule],
  controllers: [AppController],
  providers: [PrismaClient],
})
export class AppModule {}
