import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CartService } from '../../services/Cart/cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss'],
})
export class ModalCartComponent implements OnInit {
  @Input() isHover?: boolean;
  @Input() servicesInCart: Services[] = [];
  public totalAmount: number = 0;
  public numberInCart: number = 0;

  constructor(
    private cartService: CartService,
    private elementRef: ElementRef
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


    
  }
  public onRemoveService(service: Services) {
    this.cartService.removeServiceToCart(service);
    this.totalAmount = this.cartService.getTotalAmount();
  }
  @HostListener('document:click', ['$event'])
  public onPageClick(event: any) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      //Do something.
      console.log('Fuera');
      this.isHover = false 
    } else {
      console.log('Dentro');
      this.isHover = true 

    }
  }
}
