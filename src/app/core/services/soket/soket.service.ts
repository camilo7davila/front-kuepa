import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
import { Message } from 'src/app/interface/message.interface';

@Injectable({
  providedIn: 'root'
})
export class SoketService {

  socket: any
  readonly uri: string = "ws://localhost:3000"

  constructor() {
    this.socket = io.connect(this.uri)
  }

  listen( eventName : string) {
    return new Observable<Message>((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data)
      })
    })
  }

  emit(eventName, data) {
    this.socket.emit(eventName, data);
  }
}
