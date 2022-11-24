import { ApiProperty } from '@nestjs/swagger';

export class PlantQueryDto {
  limit?: number;
  offset?: number;
}

export class PlantDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  secondName: string;

  @ApiProperty()
  imageURL?: string;
}
