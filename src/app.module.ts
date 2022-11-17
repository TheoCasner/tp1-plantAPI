import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { PlantModule } from './plant/plant.module';

@Module({
  imports: [PlantModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
