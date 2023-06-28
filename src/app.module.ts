import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { IntegrationCarService } from './features/car/services';
import { IntegrationNotificationService } from './features/notification/services/notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  IntegrationNotificationSystemDashboardService,
  IntegrationNotificationSystemMerchantService,
  IntegrationNotificationSystemCustomerService,
} from './features/notification-system/services';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CARZ_INTEGRATIONS',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://bmddeeoc:V6EH4YXQKjSlGQ0ZTmviNX8tqOAQcgyV@fuji.lmq.cloudamqp.com/bmddeeoc',
          ],
          queue: 'carz_queue_002',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'CARZ_NOTIFICATIONS',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://bmddeeoc:V6EH4YXQKjSlGQ0ZTmviNX8tqOAQcgyV@fuji.lmq.cloudamqp.com/bmddeeoc',
          ],
          queue: 'carz_queue_002',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IntegrationCarService,
    IntegrationNotificationService,
    IntegrationNotificationSystemDashboardService,
    IntegrationNotificationSystemMerchantService,
    IntegrationNotificationSystemCustomerService,
  ],
  exports: [
    IntegrationCarService,
    IntegrationNotificationService,
    IntegrationNotificationSystemDashboardService,
    IntegrationNotificationSystemMerchantService,
    IntegrationNotificationSystemCustomerService,
  ],
})
export class SdkModule {}
