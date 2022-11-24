import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AdminController],
  providers: [UserService, PrismaClient],
  exports: [],
})
export class AdminModule {}
