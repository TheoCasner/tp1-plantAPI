import { PlantDto, PlantQueryDto } from '../dto/plant.dto';

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlantService {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllPlants(queryDto: PlantQueryDto): Promise<PlantDto[]> {
    return this.prisma.plant.findMany({
      skip: queryDto.offset,
      take: queryDto.limit,
      where: {
        deleted: false,
      },
    });
  }

  async getPlantById(id: number): Promise<PlantDto> {
    const plantToFind = await this.prisma.plant.findFirst({
      where: { id },
    });

    if (!plantToFind) throw new Error('Plant Not Found');
    return plantToFind;
  }

  getPlantMatchingPrefix(
    prefix: string,
    queryDto: PlantQueryDto,
  ): Promise<PlantDto[]> {
    const query = this.prisma.plant.findMany({
      skip: queryDto.offset,
      take: queryDto.limit,
      where: {
        name: {
          startsWith: prefix,
        },
      },
    });
    if (!prefix) query['where'] = undefined;
    return query;
  }
}
