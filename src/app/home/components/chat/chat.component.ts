import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { Room } from 'src/app/interface/room.interface';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Message } from 'src/app/interface/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  token: any
  room: Room
  messages : Message[]

  constructor(private userService: UserService,
              private roomService: RoomService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    // console.log(this.userService.parseJwt(this.token));
    this.roomService.getRoom('5ebae712ca814c4ad03a3df2').subscribe(data => {
      this.room = data.message
    })
    this.messageService.listMessage('5ebae712ca814c4ad03a3df2').subscribe(data => {
      this.messages = data.message
    })
  }

}
