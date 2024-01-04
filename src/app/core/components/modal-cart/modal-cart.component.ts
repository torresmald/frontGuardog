import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CartService } from '../../services/Cart/cart.service';
import { CourierService } from '../../services/courier/courier.service';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';
import { UsersService } from '../../services/Users/usersService.service';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent implements OnInit {
  public servicesInCart: Services[] = [];
  public totalAmount: number = 0;
  public isHover?: boolean = false;
  public scrollEvent: number = 0;
  public isLogged: boolean = false;

  constructor(
    private _router: Router,
    private cartService: CartService,
    private courierService: CourierService,
    private renderer: Renderer2,
    private localStorageService: LocalStorageService,
    private usersService: UsersService,
  ) {
   
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.scrollEvent =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
  }

  ngOnInit(): void {
     this.localStorageService
      .getLocalStorage()
      .subscribe((value) => (this.servicesInCart = value || []));
    this.cartService
      .getTotalAmount()
      .subscribe((value) => (this.totalAmount = value));
    this.courierService.getCartModal().subscribe((value) => {
      this.isHover = value;
      if (this.isHover) this.renderer.addClass(document.body, 'block-scroll');
      else this.renderer.removeClass(document.body, 'block-scroll');
    });
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeCartModal();
        this.scrollEvent = 0;
      }
    });
    this.usersService.userLogged$.subscribe((value) => {
      this.isLogged = value
  })
  }

  public onRemoveService(service: Services) {
    if (service) this.courierService.updateServiceInCart(service?._id, false);
    this.cartService.removeServiceToCart(service);
    service.date = '';
    service.pet = '';
    service._id = '';
  }

  public closeCartModal() {
    this.courierService.setCartModal(false);
  }
}
