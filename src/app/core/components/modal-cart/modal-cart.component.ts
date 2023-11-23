import {
  Component,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CartService } from '../../services/Cart/cart.service';
import { CourierService } from '../../services/courier/courier.service';
import { NavigationEnd, Router} from '@angular/router';

const TOKEN_KEY_CART = 'cart'

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent implements OnInit {

  @Input() servicesInCart: Services[] = [];
  public totalAmount: number = 0;
  public numberInCart: number = 0;
  public isHover?: boolean = false
  public scrollEvent: number = 0;

  constructor(
    private _router: Router,
    private cartService: CartService,
    private courierService: CourierService,
    private renderer: Renderer2,
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.scrollEvent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  }

  ngOnInit(): void {
    const dataStorage = localStorage.getItem(TOKEN_KEY_CART)
    const dataParsed = dataStorage ? JSON.parse(dataStorage) : null
    if(dataParsed){
      this.servicesInCart = dataParsed
      this.numberInCart = dataParsed.length;
    }
    this.totalAmount = this.cartService.getTotalAmount();
    this.cartService.totalAmount$.subscribe((value) => {
      this.totalAmount = value;
    });
    this.cartService.servicesAddedCart$.subscribe((value) => {
      this.servicesInCart = value;
      this.numberInCart = this.servicesInCart.length;
    });
    this.courierService.getCartModal().subscribe((value) => {
      this.isHover = value
      if (this.isHover === true)
        this.renderer.addClass(document.body, 'block-scroll');
      else
        this.renderer.removeClass(document.body, 'block-scroll')
    })
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeCartModal();
        this.scrollEvent = 0;
      }
    })
  }
  public onRemoveService(service: Services) {
    this.cartService.removeServiceToCart(service);
    this.totalAmount = this.cartService.getTotalAmount();
  }
  
  public closeCartModal() {
    this.courierService.setCartModal(false)
  }
}
