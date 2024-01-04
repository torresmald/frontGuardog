import { Component, HostListener, OnInit } from '@angular/core';
import { CourierService } from '../../services/courier/courier.service';
import { NavigationEnd, Router } from '@angular/router';
import { UsersService } from '../../services/Users/usersService.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CartService } from '../../services/Cart/cart.service';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';

@Component({
  selector: 'app-modal-nav',
  templateUrl: './modal-nav.component.html',
  styleUrls: ['./modal-nav.component.scss'],
})
export class ModalNavComponent implements OnInit {
  public isLightMode: boolean = true;
  public modalAnimation: boolean = false;
  public isLogged: boolean = false;
  public isParent: boolean = false;
  public servicesInCart: Services[] = [];
  public numberInCart: number = 0;
  public showFixedCart: boolean = false;
  public timeHoverMenu?: ReturnType<typeof setTimeout>;

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
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.courierService
      .getModalNav()
      .subscribe((value) => (this.modalAnimation = value));
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenuMobile();
      }
    });
    this.usersService.userLogged$.subscribe((value) => {
      this.isLogged = value;
    });
    this.servicesInCart = this.cartService.getCartServices();

    this.localStorageService.getLocalStorage().subscribe(value => {
        this.servicesInCart = value || [];
        this.numberInCart = this.servicesInCart.length;        
    });
    this.usersService.userLogged$.subscribe((value) => {
        this.isLogged = value
    })
    const token = localStorage.getItem('user') 
    if (token) {
        JSON.parse(token).user.pets ? this.isParent = true : this.isParent = false
    }
  }

  public closeMenuMobile() {
    this.modalAnimation = false;
    setTimeout(() => {
      this.courierService.setBooleanNav(false);
    }, 400);
  }

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  public onNavigateAccount() {
    const token = localStorage.getItem('user'); // TODO evaluar si usar una variable de entorno para el token
    if (token) {
      JSON.parse(token).user.pets
        ? (this.isParent = true)
        : (this.isParent = false);
    }
    this.isParent
      ? this.router.navigate(['/parent-view'])
      : this.router.navigate(['/trainer-view']);
  }

  public onLogout() {
    this.usersService.logout();
    this.router.navigate(['']);
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
