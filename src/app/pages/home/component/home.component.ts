import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollListener, homeAnimation } from './animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public scrollAnimation: homeAnimation = new homeAnimation({});

  constructor(private router:Router){}
  public goToRegister() {
    this.router.navigate(['register'])
  }

  ngOnInit(): void {
    ScrollListener.listen((animations) => {
      this.scrollAnimation = animations
    });
  }
  public goToLogin() {
    this.router.navigate(['login'])
  }
  public goToTrainerLogin() {
    this.router.navigate(['login'], { queryParams: { isTrainer: 'true' } })
  }
}
