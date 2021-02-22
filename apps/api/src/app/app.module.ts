import { Module } from '@nestjs/common'
import { GeneratorModule } from '../generator/generator.module'
import { SocketModule } from '../socket/socket.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
