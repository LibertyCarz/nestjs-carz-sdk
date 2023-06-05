import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { IntegrationCarService } from './features/car/services';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, IntegrationCarService],
})
export class AppModule {}
