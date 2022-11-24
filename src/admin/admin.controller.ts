import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserRole, UserDto } from 'src/dto/user.dto';

import { UserService } from 'src/user/user.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiParam({
    name: 'age',
    description: 'The age of the user',
    required: true,
    schema: {
      type: 'integer',
    },
  })
  @ApiParam({
    name: 'role',
    description: 'The role of the user, can be admin or user',
    required: true,
    schema: {
      type: 'string',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the created user',
    type: [UserDto],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'If the role is not correct',
  })
  @Post('user')
  async createUser(@Body() createUserPayload: CreateUserDto): Promise<UserDto> {
    try {
      return await this.userService.createUser(createUserPayload);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @ApiOperation({ summary: 'Update a user role' })
  @ApiParam({
    name: 'id',
    description: 'The id of the user to update',
    required: true,
    schema: {
      type: 'integer',
    },
  })
  @ApiParam({
    name: 'role',
    description: 'The role to update the user to, can be admin or user',
    required: true,
    schema: {
      type: 'string',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated user',
    type: [UserDto],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'If the role is not correct',
  })
  @Put('user')
  async updateUserRole(
    @Body() updateUserPayload: UpdateUserRole,
  ): Promise<UserDto> {
    try {
      return await this.userService.updateUserRole(updateUserPayload);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
