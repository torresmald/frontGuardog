import {  Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/Chat/chat.service';
import { FormsModule } from '@angular/forms';
import { Flowbite } from 'src/app/shared/helpers/decorator/flowbite.decorator';
import { ScrollService } from '../../services/Scroll/scroll.service';

@Flowbite()
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @Input()
  public isParent:boolean = false;
  public text: string = '';
  public showChat?: boolean;

  constructor(private chatService: ChatService, private scrollService: ScrollService) {}
  
  get chats(){
    return this.chatService.chats
  }
  get isShowBubble(){
    if(!this.isParent) {
      return this.scrollService.isShow = true
    } 
    return this.scrollService.checkScroll()
  }

  get currentHour() {
    return this.chatService.currentHour
  }
  public sendMessage() {
    if(this.text === '') return
    let messageInfo = {
      message: this.text,
      messageType: 1,
    };
    this.chatService.sendMessage(messageInfo);
    this.text = '';
    this.showChat = this.chatService.chats!.length > 0
  }
  public activateMessages() {
    this.showChat = !this.showChat;
  }
}
