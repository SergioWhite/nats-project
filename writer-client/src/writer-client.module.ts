import { Module } from '@nestjs/common';
import { WriterClientController } from './writer-client.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVER',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        }
      }
      // {
      //   name: 'REDIS_SERVER',
      //   transport: Transport.REDIS,
      //   options: {
      //     url: 'redis://localhost:6379',
      //   }
      // }
    ]),
  ],
  controllers: [WriterClientController],
})
export class WriterClientModule {}
