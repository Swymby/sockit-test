import { Inject, Injectable } from '@nestjs/common'
import { Message } from '@simopoc/interfaces'

import { Interval } from '@nestjs/schedule'

import { PUB_SUB } from '@simopoc/interfaces'
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class AppService {
    constructor(@Inject(PUB_SUB) private readonly pubSub: PubSub) { }

    getData(): Message {
        return { message: 'Welcome to api!' }
    }

    @Interval(1000)
    async generate() {
        await this.pubSub.publish('generated', { generated: { number: Math.floor(Math.random() * 100) } })
    }
}
