import {
  CreateUserDto,
  ROLE,
  UpdateUserRoleDto,
  UserDto,
} from 'src/dto/user.dto';

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(createUserPayload: CreateUserDto): Promise<UserDto> {
    if (!Object.values(ROLE).includes(createUserPayload.role)) {
      throw new Error('Invalid role');
    }

    return this.prisma.user.create({
      data: createUserPayload,
    });
  }

  async updateUserRole(updateUserPayload: UpdateUserRoleDto): Promise<UserDto> {
    if (!Object.values(ROLE).includes(updateUserPayload.role)) {
      throw new Error('Invalid role');
    }

    return this.prisma.user.update({
      where: {
        id: updateUserPayload.id,
      },
      data: {
        role: updateUserPayload.role,
      },
    });
  }

  async findOne(id: number): Promise<UserDto> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
