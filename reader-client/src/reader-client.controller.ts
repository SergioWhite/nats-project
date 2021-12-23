import {Controller, Logger} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {delay, from} from "rxjs";
import * as fs from 'fs';

const logger = new Logger('reader-client');

@Controller()
export class ReaderClientController {

  streamWriter = null;

  @MessagePattern('hello')
  async getHello(data) {

    if (!this.streamWriter) {
      logger.log(`Created streamWriter for ${data.name}...`);
      this.streamWriter = fs.createWriteStream(`./src/${data.name}`);
    }

    if (!data.chunk) {
      logger.log('0 received...');
      this.streamWriter.end();
      this.streamWriter = null;
      return from([false]);
    }

    const buffer = Buffer.from(data.chunk.data);
    logger.log(`${buffer.length} received...`);
    this.streamWriter.write(buffer);

    return from([true]).pipe(delay(4000));
  }
}
