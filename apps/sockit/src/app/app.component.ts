import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { Message, Generator } from '@simopoc/interfaces'

import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Subject } from 'rxjs'

import { map, takeUntil, tap } from 'rxjs/operators'

const QUERY = gql`
    query helloMessage {
        messages {
            message
        }
    }
`

const GENERATOR = gql`
    subscription {
        generated {
            number
        }
    }
`

const WORKSPACE_GENERATOR = gql`
    subscription generated($workspaceId: String!, $max: Int) {
        generatedWorkspace(workspaceId: $workspaceId, max: $max) {
            number
        }
    }
`

@Component({
    selector: 'soc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    notifier = new Subject<string>()

    title = 'sockit'
    message$ = this.http.get<Message>('/api')

    // generator$ = this.apollo.subscribe<{ generated: Generator }>({ query: GENERATOR }, { useZone: false }).pipe(
    //     map(res => res.data?.generated.number),
    //     takeUntil(this.notifier)
    // )

    // generatorWorkspace$ = this.apollo.subscribe<{ generatedWorkspace: Generator }>({ query: WORKSPACE_GENERATOR, variables: { workspaceId: 'zat', max: 85 } }, { useZone: false }).pipe(
    //     map(res => res.data?.generatedWorkspace.number),
    //     takeUntil(this.notifier)
    // )

    generatorWorkspace2$ = this.apollo.subscribe<{ generatedWorkspace: Generator }>({ query: WORKSPACE_GENERATOR, variables: { workspaceId: 'zat', max: (Math.floor(Math.random() * 100)) } }, { useZone: false }).pipe(
        map(res => res.data?.generatedWorkspace.number),
        takeUntil(this.notifier)
    )

    constructor(private readonly http: HttpClient, private readonly apollo: Apollo) { }

    ngOnInit(): void {
        console.log('INIT')

        this.apollo.query({ query: QUERY }).subscribe(res => console.log(res))
    }
}
