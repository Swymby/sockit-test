import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { GENERATOR, Message } from '@simopoc/interfaces'

import { webSocket } from 'rxjs/webSocket'
import { delay, retry, retryWhen, tap } from 'rxjs/operators'
import { interval } from 'rxjs'

@Component({
    selector: 'soc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    private webSocketSubject = webSocket('ws://localhost:8080/stream')

    title = 'sockit'
    message$ = this.http.get<Message>('/api')

    generator$ = this.webSocketSubject.multiplex(
        () => ({ event: GENERATOR, data: 'gen1' }),
        () => ({ event: GENERATOR, data: 'unsubscribe' }),
        (val: any) => val.sub === 'gen1'
    ).pipe(
        tap(d => console.log('gen 1', d)),
        retryWhen(errors => errors.pipe(
            delay(5000)
        ))
    )

    generator2$ = this.webSocketSubject.multiplex(
        () => ({ event: GENERATOR, data: 'gen2' }),
        () => ({ event: GENERATOR, data: 'unsubscribe' }),
        (val: any) => val.sub === 'gen2'
    ).pipe(
        tap(d => console.log('gen 2', d)),
        retryWhen(errors => errors.pipe(
            delay(5000)
        ))
    )

    constructor(private readonly http: HttpClient) {}

    ngOnInit(): void {
      //  this.webSocketSubject.next({ subscribe: GENERATOR })
        console.log('INIT')
    }
}
