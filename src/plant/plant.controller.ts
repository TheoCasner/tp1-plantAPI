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
import { PlantDto, PlantQueryDto } from '../dto/plant.dto';

import { PlantService } from './plant.service';

@ApiTags('plant')
@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

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
    required: false,
    schema: {
      type: 'string',
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the plant with the given prefix',
    type: [PlantDto],
  })
  @Get('/search/:prefix?')
  async getPlantMatchingPrefix(
    @Query() queryDto: PlantQueryDto,
    @Param('prefix') prefix: string,
  ): Promise<PlantDto[]> {
    return this.plantService.getPlantMatchingPrefix(prefix, {
      offset: +queryDto.offset || DEFAULT_OFFSET,
      limit: +queryDto.limit || DEFAULT_LIMIT,
    });
  }

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
    status: 201,
    description: 'Returns the plant with the given id',
    type: PlantDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Plant not found',
  })
  @Get(':id')
  async getPlantById(@Param('id') id: string): Promise<PlantDto> {
    try {
      return await this.plantService.getPlantById(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
