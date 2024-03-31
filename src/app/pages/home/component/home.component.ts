import { Component, OnInit } from '@angular/core';
import { ScrollListener, homeAnimation } from './animation';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public scrollAnimation: homeAnimation = new homeAnimation({});

  constructor(private navigationService: NavigationService){}
  public goToRegister() {
    this.navigationService.onNavigate('register')
  }

  ngOnInit(): void {
    ScrollListener.listen((animations) => {
      this.scrollAnimation = animations
    });
  }
  public goToLogin() {
    this.navigationService.onNavigate('login')
  }
  public goToTrainerLogin() {
    this.navigationService.onNavigate('login', undefined,  { queryParams: { isTrainer: 'true' } })
  }
}
