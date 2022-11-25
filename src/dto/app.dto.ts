import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ required: true, type: String, example: 'UnAuthorized' })
  message: string;
}
