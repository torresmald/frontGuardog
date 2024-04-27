import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/services/Chat/chat.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './trainer-view.component.html',
  styleUrls: [],
})
export class TrainerViewComponent implements OnInit {
  public id?: string
  public token?:string

  constructor(private localStorageService: LocalStorageService, private navigationService: NavigationService, public  chatService: ChatService) {}

  ngOnInit(): void {
    const storedValue: string | null = this.localStorageService.getLocalItem(this.localStorageService.TOKEN_KEY_USER)
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;
    this.id = parsedValue.user._id
  }

  public onNavigate(route:string){
    this.navigationService.onNavigate(`/${route}/`, this.id)
  }
  
}
