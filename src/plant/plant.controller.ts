import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'src/app.controller';
import { PlantEntity } from './plant.entity';

import { PlantService } from './plant.service';

@ApiTags('plant')
@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @ApiOperation({ summary: 'Get plant by Id' })
  @ApiParam({
    name: 'id',
    description: 'The id to search for',
    required: true,
    schema: {
      type: 'integer',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the plant with the given id',
    type: PlantEntity,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Plant not found',
  })
  @Get(':id')
  getPlantById(@Param('id') id: string): PlantEntity {
    try {
      return this.plantService.getPlantById(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @ApiOperation({ summary: 'Get plants matching prefix' })
  @ApiQuery({
    name: 'limit',
    required: false,
    schema: {
      type: 'integer',
      default: DEFAULT_LIMIT,
      minimum: 0,
    },
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    schema: {
      type: 'integer',
      default: DEFAULT_OFFSET,
      minimum: 0,
    },
  })
  @ApiParam({
    name: 'prefix',
    description: 'The prefix to match',
    required: true,
    schema: {
      type: 'string',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the plant with the given prefix',
    type: [PlantEntity],
  })
  @Get('/search/:prefix')
  getPlantMatchingPrefix(
    @Param('prefix') prefix: string,
    @Query() queryDto: { limit?: number; offset?: number },
  ): PlantEntity[] {
    return this.plantService.getPlantMatchingPrefix(prefix, queryDto);
  }
}
