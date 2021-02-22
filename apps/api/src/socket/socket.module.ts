import { Module } from '@nestjs/common'
import { GeneratorModule } from '../generator/generator.module'
import { SocketGateway } from './socket.gateway'

@Module({
    imports: [GeneratorModule],
    providers: [SocketGateway]
})
export class SocketModule { }
