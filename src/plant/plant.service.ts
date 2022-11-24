import * as plant from '../../plant.json';

import { Plant, PrismaClient } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PlantEntity } from '../entity/plant.entity';
import { PlantQueryDto } from '../dto/plant.dto';

@Injectable()
export class PlantService {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllPlants(queryDto: PlantQueryDto): Promise<Plant[]> {
    return this.prisma.plant.findMany({
      skip: queryDto.offset,
      take: queryDto.limit,
      where: {
        deleted: false,
      },
    });
  }

  getPlantById(id: number): PlantEntity {
    const plantToFind = plant.find((p) => p.id === id);
    if (!plantToFind) throw new Error('Plant Not Found');

    return plantToFind;
  }

  getPlantMatchingPrefix(
    prefix: string,
    queryDto: PlantQueryDto,
  ): PlantEntity[] {
    const plantsFiltered = prefix
      ? plant.filter((p) => p.name.startsWith(prefix))
      : plant;
    return plantsFiltered.slice(queryDto.offset).slice(0, queryDto.limit);
  }
}
