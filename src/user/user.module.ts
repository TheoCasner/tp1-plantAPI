import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from './user.service';

@Module({
  controllers: [],
  providers: [UserService, PrismaClient],
  exports: [UserService],
})
export class UserModule {}
