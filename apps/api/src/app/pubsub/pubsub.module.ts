import { Module } from '@nestjs/common'
import { PUB_SUB } from '@simopoc/interfaces'
import { PubSub } from 'graphql-subscriptions'

@Module({
    providers: [
        {
            provide: PUB_SUB,
            useValue: new PubSub(),
        }
    ],
    exports: [
        PUB_SUB
    ]
})
export class PubSubModule { }
