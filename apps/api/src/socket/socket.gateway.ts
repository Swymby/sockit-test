import { Logger } from '@nestjs/common'
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets'
import { GENERATOR } from '@simopoc/interfaces'
import { GeneratorService } from '../generator/generator.service'

import * as WebSocket from 'ws'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@WebSocketGateway(8080, { path: '/stream' })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('SocketGateway')
    private generator$ = this.generator.generate$

    constructor(private readonly generator: GeneratorService) { }

    afterInit() {
        this.logger.log('Init')
    }

    @SubscribeMessage(GENERATOR)
    onEvent(@MessageBody() data: unknown): Observable<WsResponse<number>> {
        const event = GENERATOR

        this.logger.log(JSON.stringify(data))

        return this.generator$.pipe(
            map(num => ({ event, data: num, sub: data })),
            tap(res => this.logger.log(`${JSON.stringify(data)} ${res.data}`))
        )
    }

    handleDisconnect(client: WebSocket) {
        this.logger.log(`Client disconnected: ${client.url}`)
    }

    handleConnection(client: WebSocket) {
        this.logger.log(`Client connected: ${client}`)
    }
}
