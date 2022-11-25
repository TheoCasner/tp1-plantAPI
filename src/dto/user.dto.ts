import { ApiProperty } from '@nestjs/swagger';

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @ApiProperty({ required: true, type: Number, example: 22 })
  age: number;

  @ApiProperty({ required: true, type: String, example: 'user' })
  role: ROLE;
}

export class UpdateUserRoleDto {
  @ApiProperty({ required: true, type: Number, example: '1' })
  id: number;

  @ApiProperty({ required: true, type: String, example: 'user' })
  role: ROLE;
}

export class UserDto {
  @ApiProperty({ required: true, type: Number, example: '1' })
  id: number;

  @ApiProperty({ required: true, type: Number, example: '22' })
  age: number;

  @ApiProperty({ required: true, type: String, example: 'user' })
  role: string;
}
