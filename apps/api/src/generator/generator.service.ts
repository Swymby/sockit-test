import { Injectable } from '@nestjs/common'
import { interval } from 'rxjs'
import { map, share, tap } from 'rxjs/operators'

@Injectable()
export class GeneratorService {
    generate$ = interval(1000).pipe(
        map(() => Math.floor(Math.random() * 100)),
        tap(() => console.log('tap')),
        share()
    )
}
