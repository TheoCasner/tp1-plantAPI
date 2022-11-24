import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, UserService, PrismaClient],
  exports: [AdminService],
})
export class AdminModule {}
