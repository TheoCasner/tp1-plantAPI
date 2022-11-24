import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MessageDto } from './dto/app.dto';
import { PlantDto, PlantQueryDto } from './dto/plant.dto';

import { PlantService } from './plant/plant.service';

export const DEFAULT_LIMIT = 10;
export const DEFAULT_OFFSET = 0;

@Controller()
export class AppController {
  constructor(private readonly plantService: PlantService) {}

  @ApiOperation({ summary: 'Get all plants' })
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
  @ApiResponse({
    status: 200,
    description: 'Returns a list of plants',
    type: [PlantDto],
  })
  @Get()
  async getAllPlants(@Query() queryDto: PlantQueryDto): Promise<PlantDto[]> {
    return this.plantService.getAllPlants({
      offset: +queryDto.offset || DEFAULT_OFFSET,
      limit: +queryDto.limit || DEFAULT_LIMIT,
    });
  }

  @ApiOperation({
    summary: 'Check if you are old enough to bypass parentcontrol',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the message if you can access',
    type: [MessageDto],
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    type: [MessageDto],
  })
  @Get('content')
  async routeToCheckParentControl(): Promise<MessageDto> {
    return { message: 'You are allowed to access this route' };
  }
}
