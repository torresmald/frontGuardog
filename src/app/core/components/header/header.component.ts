import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';

import { Observable } from 'rxjs';

import { CourierService } from '../../services/courier/courier.service';
import { UsersService } from '../../services/Users/usersService.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';
import { CartService } from '../../services/Cart/cart.service';




import localeEs from '@angular/common/locales/es';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public token?: string;
  public id?: string;
  public scrollNav: boolean = false;
  public isLogged: Observable<boolean> = new Observable<boolean>();
  public isParent: boolean = false;
  public servicesInCart: Services[] = [];
  public numberInCart: number = 0;
  public showFixedCart: boolean = false;
  public timeHoverMenu?: ReturnType<typeof setTimeout>;
 

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPercentage =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    this.scrollNav = scrollPercentage >= 20;
    this.showFixedCart = window.scrollY > 100;
  }

  constructor(
    private courierService: CourierService,
    private usersService: UsersService,
    public router: Router,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private navigationService : NavigationService
  ) {
  }
  ngOnInit(): void {
    this.servicesInCart = this.cartService.getCartServices();
    this.localStorageService.getLocalStorage().subscribe((value) => {
      this.servicesInCart = value || [];
      this.numberInCart = this.servicesInCart.length;
    });
    this.isLogged = this.usersService.userLogged$
    const token = this.localStorageService.getLocalItem(this.localStorageService.TOKEN_KEY_USER)
    if (token) {
      JSON.parse(token).user.pets
        ? (this.isParent = true)
        : (this.isParent = false);
    }
  }

  public openMenuMobile() {
    this.courierService.setBooleanNav(true);
  }

  public onLogout() {
    this.usersService.logout();
    this.navigationService.onNavigate('')
  }

  public onNavigateAccount() {
    this.navigationService.onNavigateAccount()
  }

  public onNavigateServices() {
    this.navigationService.onNavigateServices()
  }
  public onChangeHover() {
    if (this.servicesInCart.length >= 1) {
      this.timeHoverMenu = setTimeout(() => {
        this.courierService.setCartModal(true);
      }, 1000);
    }
  }

  public onHoverLeave() {
    clearTimeout(this.timeHoverMenu);
  }
}
