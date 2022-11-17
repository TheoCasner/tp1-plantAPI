import { ApiProperty } from '@nestjs/swagger';

export class PlantEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  secondName: string;

  @ApiProperty()
  imageURL?: string;
}
