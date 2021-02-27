import { Inject } from '@nestjs/common'
import { Args, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PUB_SUB } from '@simopoc/interfaces'
import { AppService } from '../app.service'
import { PubSub } from 'graphql-subscriptions'

@Resolver('Message')
export class MessageResolver {

    constructor(private readonly messageService: AppService, @Inject(PUB_SUB) private readonly pubSub: PubSub) { }

    @Query()
    async messages() {
        return this.messageService.getData()
    }

    @Subscription()
    generated() {
        console.log('subscribe')
        return this.pubSub.asyncIterator('generated')
    }

    @Subscription('generatedWorkspace', {
        filter: (payload, variables) => {
            console.log('var', variables)
            console.log('pay', payload)
            return payload.generatedWorkspace.number <= (variables.max ?? 50) && variables.workspaceId === 'zat'
        },
    })
    generatedWorkspace(@Args('workspaceId') workspaceId: string) {
        console.log('subscribe workspace', workspaceId)
        return this.pubSub.asyncIterator('generatedWorkspace')
    }
}
