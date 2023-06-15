import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { IntegrationCarService } from './features/car/services';
import { IntegrationNotificationService } from './features/notification/services/notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE } from './constants';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      { name: SERVICE.CARZ_INTEGRATIONS, transport: Transport.TCP },
      { name: SERVICE.CARZ_NOTIFICATIONS, transport: Transport.TCP },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IntegrationCarService,
    IntegrationNotificationService,
  ],
})
export class AppModule {}
