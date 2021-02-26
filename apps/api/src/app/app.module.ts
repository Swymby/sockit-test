import { Module } from '@nestjs/common'
import { SocketModule } from '../socket/socket.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { GraphQLModule } from '@nestjs/graphql'
import { MessageResolver } from './message/message.resolver'
import { GeneratorService } from '../generator/generator.service'
import { PubSubModule } from './pubsub/pubsub.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
    imports: [
        SocketModule,
        PubSubModule,

        ScheduleModule.forRoot(),
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            typePaths: ['./apps/api/src/graphql/**/*.graphql']
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        MessageResolver,
        GeneratorService,

    ],
})
export class AppModule { }
