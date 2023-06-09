import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { IntegrationCarService } from './features/car/services';
import { IntegrationNotificationService } from './features/notification/services/notification.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    IntegrationCarService,
    IntegrationNotificationService,
  ],
})
export class AppModule {}
