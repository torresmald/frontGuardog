import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Chat } from '../../models/Chat/chat.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats: Chat[] =  [];
  public chatsEmitter?: Subject<Chat[]>
  io = io("http://localhost:4000", {
    autoConnect: true
  })
  constructor() {
    this.receiveMessage();
  }

  public sendMessage(messageInfo: Chat) {
    if(!this.chats){
      return;
    }
    this.chats.push(messageInfo);
    this.chatsEmitter?.next(this.chats)
    this.io.emit('sendMessage', messageInfo);
  }

  public receiveMessage() {
    this.io.on('receiveMessage', (messageInfo) => {
      if(!this.chats){
        return;
      }
      messageInfo.messageType = 2;
      this.chats.push(messageInfo);
      this.chatsEmitter?.next(this.chats)
    });
  }
}
