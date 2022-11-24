import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PlantModule } from './plant/plant.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [PlantModule],
  controllers: [AppController],
  providers: [PrismaClient],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
