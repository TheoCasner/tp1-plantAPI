import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AuthorizerMiddleware } from './middleware/authorizer.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ParentControlMiddleware } from './middleware/parent-control.middleware';
import { PlantModule } from './plant/plant.module';
import { PrismaClient } from '@prisma/client';
import { UserModule } from './user/user.module';

@Module({
  imports: [PlantModule, AdminModule, UserModule],
  controllers: [AppController],
  providers: [PrismaClient],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
    consumer.apply(AuthorizerMiddleware).forRoutes('/admin');
    consumer.apply(ParentControlMiddleware).forRoutes('/content');
  }
}
