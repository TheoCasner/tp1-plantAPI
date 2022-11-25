import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserRoleDto, UserDto } from 'src/dto/user.dto';

import { UserService } from 'src/user/user.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'The payload to create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the created user',
    type: [UserDto],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'If the role is not correct',
  })
  @ApiBearerAuth()
  @Post('user')
  async createUser(@Body() createUserPayload: CreateUserDto): Promise<UserDto> {
    try {
      return await this.userService.createUser(createUserPayload);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @ApiOperation({ summary: 'Update a user role' })
  @ApiBody({
    type: UpdateUserRoleDto,
    description: "The payload to update user's role",
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the updated user',
    type: [UserDto],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'If the role is not correct',
  })
  @ApiBearerAuth()
  @Put('user')
  async updateUserRole(
    @Body() updateUserPayload: UpdateUserRoleDto,
  ): Promise<UserDto> {
    try {
      return await this.userService.updateUserRole(updateUserPayload);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
