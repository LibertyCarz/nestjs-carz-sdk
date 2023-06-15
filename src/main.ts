import { NestFactory } from '@nestjs/core';
import { AppSdkModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppSdkModule);
  await app.listen(3000);
}
bootstrap();
