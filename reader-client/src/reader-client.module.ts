import {Module} from '@nestjs/common';
import {ReaderClientController} from './reader-client.controller';
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
      ]),
  ],
  controllers: [ReaderClientController],
})
export class ReaderClientModule {}
