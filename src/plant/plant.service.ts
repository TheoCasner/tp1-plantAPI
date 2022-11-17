import * as plant from '../../plant.json';

import { Injectable } from '@nestjs/common';
import { PlantEntity } from './plant.entity';

@Injectable()
export class PlantService {
  getAllPlants(queryDto: { limit?: number; offset?: number }): PlantEntity[] {
    return plant.slice(queryDto.offset).slice(0, queryDto.limit);
  }

  getPlantById(id: number): PlantEntity {
    const plantToFind = plant.find((p) => p.id === id);
    if (!plantToFind) throw new Error('Plant Not Found');

    return plantToFind;
  }

  getPlantMatchingPrefix(
    prefix: string,
    queryDto: { limit?: number; offset?: number },
  ): PlantEntity[] {
    const plantsFiltered = prefix
      ? plant.filter((p) => p.name.startsWith(prefix))
      : plant;
    return plantsFiltered.slice(queryDto.offset).slice(0, queryDto.limit);
  }
}
