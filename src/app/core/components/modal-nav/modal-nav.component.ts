import { Component, HostListener, OnInit } from '@angular/core';
import { CourierService } from '../../services/courier/courier.service';
import { NavigationEnd, Router } from '@angular/router';
import { UsersService } from '../../services/Users/usersService.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CartService } from '../../services/Cart/cart.service';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

@Component({
  selector: 'app-modal-nav',
  templateUrl: './modal-nav.component.html',
  styleUrls: ['./modal-nav.component.scss'],
})
export class ModalNavComponent implements OnInit {
  public modalAnimation?: Observable<boolean>;
  public isLogged?: Observable<boolean>;
  public isParent: boolean = false;
  public servicesInCart: Services[] = [];
  public showFixedCart: boolean = false;
  public timeHoverMenu?: ReturnType<typeof setTimeout>;
  public id?:string;
  public token?: string;


  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 769) {
      this.closeMenuMobile();
    }
  }

  constructor(
    public courierService: CourierService,
    private router: Router,
    private usersService: UsersService,
    private cartService: CartService,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.modalAnimation = this.courierService
      .getModalNav()
      
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenuMobile();
      }
    });
    this.isLogged = this.usersService.userLogged$
    this.servicesInCart = this.cartService.getCartServices();
    console.log(this.servicesInCart);
    

    const token = this.localStorageService.getLocalItem(this.localStorageService.TOKEN_KEY_USER) 
    if (token) {
        JSON.parse(token).user.pets ? this.isParent = true : this.isParent = false
    }
  }

  public closeMenuMobile() {
    this.modalAnimation?.subscribe();
    setTimeout(() => {
      this.courierService.setBooleanNav(false);
    }, 400);
  }

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  public onNavigateAccount() {
    this.navigationService.onNavigateAccount()
  }
  public onNavigateServices() {
    this.navigationService.onNavigateServices()
}
  public onLogout() {
    this.usersService.logout();
    this.navigationService.onNavigate('')
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
