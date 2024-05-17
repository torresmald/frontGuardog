import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Chat } from '../../models/Chat/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public currentHour?: string;

  public chats: Chat[] =  [];
  io = io("https://apiguardog.onrender.com",  {
    autoConnect: true
  }
)
  constructor() {
    this.receiveMessage();
  }

  public sendMessage(messageInfo: Chat) {
    if(!this.chats){
      return;
    }
    this.chats.push(messageInfo);
    this.io.emit('sendMessage', messageInfo);
  }

  public receiveMessage() {
    this.currentHour  = new Date().toLocaleTimeString('es-ES', { hour: "2-digit", minute: "2-digit", hour12: false});  
    this.io.on('receiveMessage', (messageInfo) => {
      if(!this.chats){
        return;
      }
      messageInfo.messageType = 2;
      this.chats.push(messageInfo);
    });
  }
}
