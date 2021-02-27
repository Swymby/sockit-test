import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'

import { APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'

import { split, InMemoryCache } from '@apollo/client/core'

import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,

        HttpClientModule,
        RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    ],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                const http = httpLink.create({
                    uri: 'http://localhost:3333/graphql',
                })

                const ws = new WebSocketLink({
                    uri: `ws://localhost:3333/graphql`,
                    options: {
                        reconnect: true,
                        reconnectionAttempts: 10
                    },
                })

                const link = split(
                    // split based on operation type
                    ({ query }) => {
                        const definition = getMainDefinition(query)
                        return (
                            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
                        )
                    },
                    ws,
                    http,
                )

                return {
                    cache: new InMemoryCache(),
                    link
                }
            },
            deps: [HttpLink],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
