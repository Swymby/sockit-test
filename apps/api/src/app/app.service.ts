import { Injectable } from '@nestjs/common'
import { Message } from '@simopoc/interfaces'

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' }
  }
}
