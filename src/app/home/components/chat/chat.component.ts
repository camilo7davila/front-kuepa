import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { RoomService } from 'src/app/core/services/room/room.service';
import { Room } from 'src/app/interface/room.interface';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Message } from 'src/app/interface/message.interface';
import { SoketService } from 'src/app/core/services/soket/soket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  token: any
  room: Room
  messages : Message[]
  text: string = ''
  decode: any;
  sockets: Message[] = []

  constructor(private userService: UserService,
              private roomService: RoomService,
              private messageService: MessageService,
              private socketService: SoketService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.decode = this.userService.parseJwt(this.token)
    this.getRoom()
    this.listMessage()
    this.socketService.listen('message').subscribe(data => {
      this.sockets.push(data)
      console.log(this.sockets);
    })
  }

  getRoom() {
    this.roomService.getRoom('5ebae712ca814c4ad03a3df2').subscribe(data => {
      this.room = data.message
    })
  }

  listMessage() {
    this.messageService.listMessage('5ebae712ca814c4ad03a3df2').subscribe(data => {
      this.messages = data.message
      console.log(this.messages);
    })
  }

  sendMessage() {
    if(this.text == '') {
      alert('No puede enviar mensajes vacios')
    }else{
      const fullMessage = {
        room: '5ebae712ca814c4ad03a3df2',
        user: this.decode._id,
        message: this.text
      }
      this.messageService.createMessage(fullMessage).subscribe(()=> {
        this.text = ''
      })
    }
  }

}
