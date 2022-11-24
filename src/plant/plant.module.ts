import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PlantController],
  providers: [PlantService, PrismaClient],
  exports: [PlantService],
})
export class PlantModule {}
