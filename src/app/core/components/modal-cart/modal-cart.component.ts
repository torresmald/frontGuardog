import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CartService } from '../../services/Cart/cart.service';
import { CourierService } from '../../services/courier/courier.service';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorage/local-storage.service';
import { UsersService } from '../../services/Users/usersService.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styles: [],
})
export class ModalCartComponent implements OnInit {
  public servicesInCart?: Observable<Services[] | null>
  public totalAmount?: Observable<number>
  public isHover?: boolean = false;
  public scrollEvent: number = 0;
  public isLogged?: Observable<boolean>
  
  constructor(
    private router: Router,
    private cartService: CartService,
    private courierService: CourierService,
    private renderer: Renderer2,
    private localStorageService: LocalStorageService,
    private usersService: UsersService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.scrollEvent =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
  }

  ngOnInit(): void {
    this.totalAmount = this.cartService.getTotalAmount();
    this.isLogged = this.usersService.userLogged$;
    this.servicesInCart = this.localStorageService
      .getLocalStorage()
      
    this.courierService.getCartModal().subscribe((value) => {
      this.isHover = value;
      if (this.isHover) this.renderer.addClass(document.body, 'block-scroll');
      else this.renderer.removeClass(document.body, 'block-scroll');
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeCartModal();
        this.scrollEvent = 0;
      }
    });
  }

  public onRemoveService(service: Services) {
    if (service) this.courierService.updateServiceInCart(service?._id, false);
    this.cartService.removeServiceToCart(service);
    this.resetService(service)
  }

  public closeCartModal() {
    this.courierService.setCartModal(false);
  }

  public resetService(service: Services){
    service.date = '';
    service.pet = '';
    service._id = '';
  }
}
