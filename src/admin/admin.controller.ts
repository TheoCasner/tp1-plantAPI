import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserRole, UserDto } from 'src/dto/user.dto';

import { UserService } from 'src/user/user.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async createUser(@Body() createUserPayload: CreateUserDto): Promise<UserDto> {
    try {
      return await this.userService.createUser(createUserPayload);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Put('user')
  async updateUserRole(
    @Body() updateUserPayload: UpdateUserRole,
  ): Promise<UserDto> {
    return this.userService.updateUserRole(updateUserPayload);
  }
}
