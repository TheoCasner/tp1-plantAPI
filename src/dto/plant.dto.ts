import { ApiProperty } from '@nestjs/swagger';

export class PlantQueryDto {
  @ApiProperty({ required: false, type: Number, example: 10 })
  limit?: number;

  @ApiProperty({ required: false, type: Number, example: 0 })
  offset?: number;
}

export class PlantDto {
  @ApiProperty({ required: true, type: Number, example: 1 })
  id: number;

  @ApiProperty({ required: true, type: String, example: 'Orchidée Bleu' })
  name: string;

  @ApiProperty({ required: true, type: String, example: 'Orchidée Cobalt' })
  secondName: string;

  @ApiProperty({
    required: false,
    type: String,
    example:
      'https://www.gammvert.fr/conseils/sites/default/files/styles/main_image/public/orchidee-bleue-jr.jpg',
  })
  imageURL?: string;
}
