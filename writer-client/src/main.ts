import { NestFactory } from '@nestjs/core';
import { WriterClientModule } from './writer-client.module';

async function bootstrap() {
  const app = await NestFactory.create(WriterClientModule);
  await app.listen(3000);
}
bootstrap();
