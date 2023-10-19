import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router:Router){}
  public goToRegister() {
    this.router.navigate(['register'])
  }
  public goToLogin() {
    this.router.navigate(['login'])
  }
  public goToTrainerLogin() {
    this.router.navigate(['login'], { queryParams: { isTrainer: 'true' } })
  }
}
