import { NestFactory } from '@nestjs/core';
import { SdkModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(SdkModule);
  await app.listen(3000);
}
bootstrap();
