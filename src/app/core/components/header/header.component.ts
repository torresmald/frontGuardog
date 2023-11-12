import { Component, HostListener, OnInit } from '@angular/core';
import { CourierService } from '../../services/courier/courier.service';
import { UsersService } from '../../services/Users/usersService.service';
import { Router } from '@angular/router';
const TOKEN_KEY = 'user'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLightMode: boolean = true;
  public scrollNav: boolean = false;
  public isLogged: boolean = false;
  public isParent:boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage =
      (scrollPosition / (pageHeight - windowHeight)) * 100;
    if (scrollPercentage >= 20) this.scrollNav = true;
    else this.scrollNav = false;
  }

  constructor(public courierService: CourierService, private usersService: UsersService, public router: Router) {}

  ngOnInit(): void {
    // const userPrefersDark =
    //   window.matchMedia &&
    //   window.matchMedia('(prefers-color-scheme: dark)').matches;
    // const userPrefersLight =
    //   window.matchMedia &&
    //   window.matchMedia('(prefers-color-scheme: light)').matches;
    // if (userPrefersDark) {
    //   this.theme = 'dark';
    // }
    // if (userPrefersLight) {
    //   this.theme = 'light';
    // }

    this.usersService.userLogged$.subscribe((value) => {      
      this.isLogged = value
    })
  }

  public openMenuMobile() {
    this.courierService.setBooleanNav(true);
  }
  
  public onLogout(){
    this.usersService.logout()
    this.router.navigate([''])
  }
  public onNavigateAccount(){
    const token = localStorage.getItem(TOKEN_KEY)
    if(token){
      JSON.parse(token).user.pets ? this.isParent = true : this.isParent= false
    }
    this.isParent ? this.router.navigate(['/parent-view']) : this.router.navigate(['/trainer-view'])
  }
}
