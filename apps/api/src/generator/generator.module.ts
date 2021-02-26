import { Module } from '@nestjs/common'
import { PubSubModule } from '../app/pubsub/pubsub.module'
import { GeneratorService } from './generator.service'

@Module({
    imports: [PubSubModule],
    providers: [GeneratorService],
    exports: [GeneratorService]
})
export class GeneratorModule { }
