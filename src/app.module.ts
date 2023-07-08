import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  NotificationSystemDashboardInternalService,
  NotificationSystemInternalService,
} from './features/notification-system/services';
import { IntegrationCarInternalService } from './features/car/services';
import { SERVICES } from './constants';
import { NotificationInternalService } from './features/notification/services/notification.internal.service';

@Global()
@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'CARZ_INTEGRATIONS',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [
    //         'amqps://bmddeeoc:V6EH4YXQKjSlGQ0ZTmviNX8tqOAQcgyV@fuji.lmq.cloudamqp.com/bmddeeoc',
    //       ],
    //       queue: 'carz_queue_002',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    //   {
    //     name: 'CARZ_NOTIFICATIONS',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [
    //         'amqps://bmddeeoc:V6EH4YXQKjSlGQ0ZTmviNX8tqOAQcgyV@fuji.lmq.cloudamqp.com/bmddeeoc',
    //       ],
    //       queue: 'carz_queue_002',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
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
  providers: [AppService, IntegrationCarInternalService],
  exports: [IntegrationCarInternalService],
})
export class SdkModule {}
