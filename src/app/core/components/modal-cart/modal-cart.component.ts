import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CartService } from '../../services/Cart/cart.service';
import { HeaderService } from '../../services/Header/header.service';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent implements OnInit {
  @Input() servicesInCart: Services[] = [];
  public totalAmount: number = 0;
  public numberInCart: number = 0;
  public isHover: boolean = false

  constructor(
    private cartService: CartService,
    private elementRef: ElementRef,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.totalAmount = this.cartService.getTotalAmount();
    this.cartService.totalAmount$.subscribe((value) => {
      this.totalAmount = value;
    });
    this.cartService.servicesAddedCart$.subscribe((value) => {
      this.servicesInCart = value;
      this.numberInCart = this.servicesInCart.length;
    });   
    this.headerService.showCartPreview$.subscribe((value) => {
      this.isHover = value
    })
  }
  public onRemoveService(service: Services) {
    this.cartService.removeServiceToCart(service);
    this.totalAmount = this.cartService.getTotalAmount();
  }
  @HostListener('document:click', ['$event'])
  public onPageClick(event: any) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    !clickedInside ? this.isHover = false : this.isHover = true
  }
}
