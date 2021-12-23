import {NestFactory} from '@nestjs/core';
import {ReaderClientModule} from './reader-client.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";

const logger = new Logger('nats');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      ReaderClientModule,
      {
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        }
      }
      // {
      //     transport: Transport.REDIS,
      //     options: {
      //         url: 'redis://localhost:6379',
      //     }
      // }
  );
  logger.log('reader-client is running...')
  await app.listen();
}
bootstrap();
