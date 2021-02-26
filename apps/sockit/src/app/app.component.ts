import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { Message, Generator } from '@simopoc/interfaces'

import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Subject } from 'rxjs'

import { map, takeUntil } from 'rxjs/operators'

const QUERY = gql`
    query helloMessage {
        messages {
            message
        }
    }
`

const GENERATOR = gql`
    subscription generated {
        generated {
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

    generator$ = this.apollo.subscribe<{ generated: Generator }>({ query: GENERATOR }).pipe(
        map(res => res.data?.generated.number),
        takeUntil(this.notifier)
    )

    constructor(private readonly http: HttpClient, private readonly apollo: Apollo) { }

    ngOnInit(): void {
        console.log('INIT')

        this.apollo.query({ query: QUERY }).subscribe(res => console.log(res))
    }
}
