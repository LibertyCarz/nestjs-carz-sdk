import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from './constants';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICES.CARZ_NOTIFICATIONS,
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_NOTIFICATION_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
      {
        name: SERVICES.CARZ_INTEGRATIONS,
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_INTEGRATION_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
      {
        name: SERVICES.CARZ_LOYALTIES,
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_LOYALTY_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
      {
        name: SERVICES.CARZ_CAR_PARTS,
        useFactory: async () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_CAR_PARTS_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ClientsModule, HttpModule],
})
export class SdkModule {}
