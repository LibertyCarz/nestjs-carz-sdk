import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  NotificationSystemDashboardInternalService,
  NotificationSystemInternalService,
} from './features/notification-system/services';
import { SERVICES } from './constants';
import { NotificationInternalService } from './features/notification/services/notification.internal.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICES.CARZ_NOTIFICATIONS,
        inject: [
          NotificationInternalService,
          NotificationSystemDashboardInternalService,
          NotificationSystemInternalService,
        ],
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_NOTIFICATION_QUEUE,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    NotificationInternalService,
    NotificationSystemDashboardInternalService,
    NotificationSystemInternalService,
  ],
  exports: [
    ClientsModule,
    NotificationInternalService,
    NotificationSystemDashboardInternalService,
    NotificationSystemInternalService,
  ],
})
export class SdkModule {}
