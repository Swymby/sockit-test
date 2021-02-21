import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Message } from '@simopoc/interfaces'

@Component({
    selector: 'soc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'sockit'
    message$ = this.http.get<Message>('/api')

    constructor(private readonly http: HttpClient) {}
}
