import {Controller, Get, Inject, Logger} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {
    firstValueFrom,
    timeout
} from "rxjs";
import * as fs from 'fs';

const logger = new Logger('writer-client');

@Controller()
export class WriterClientController {
  constructor(@Inject('NATS_SERVER') private client: ClientProxy) {}
  // constructor(@Inject('REDIS_SERVER') private client: ClientProxy) {}

    @Get()
    async sendData() {
        for await (const chunk of fs.createReadStream('./src/nest.jpeg', {
            highWaterMark: 1000,
        })) {
            if (!await this.sendChunk('nest.jpeg', chunk)) {
                logger.error('Some errors from other side...')
                break;
            }
        }

        logger.log('Send final chunk...');
        await this.sendChunk('nest.jpeg', null);
        logger.log(('End sending...'));
    }

    private async sendChunk(name: string, chunk: any) {
        logger.log(`Send ${chunk ? chunk.length : 0} of the data...`);
        return await firstValueFrom(this.client.send('hello', {
            name,
            chunk,
        }).pipe(timeout({
            each: 10000,
            with: () => { throw new Error('Not responding for too long...') }
        })));
    }

    // onModuleInit() {
    //   this.sendData();
    // }
}
