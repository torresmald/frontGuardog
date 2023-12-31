import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './trainer-view.component.html',
  styleUrls: ['./trainer-view.component.scss'],
})
export class TrainerViewComponent implements OnInit {
  public id?: string
  public token?:string
  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  ngOnInit(): void {
    this.token = this.localStorageService.TOKEN_KEY_USER;
    const storedValue: string | null = localStorage.getItem(this.token);
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;
    this.id = parsedValue.user._id
  }

  public onNavigate(route:string){
    this.router.navigate([`/${route}/${this.id}`])
  }
  
}
