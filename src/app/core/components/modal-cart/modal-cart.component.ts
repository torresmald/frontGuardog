import { Component, Input, OnInit } from '@angular/core';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { CartService } from '../../services/Cart/cart.service';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.component.html',
  styleUrls: ['./modal-cart.component.scss']
})
export class ModalCartComponent implements OnInit {
  @Input() isHover: boolean = false
  @Input() servicesInCart: Services[] = []
  public totalAmount: number = 0
  public numberInCart: number = 0


  constructor(private cartService: CartService){}


  ngOnInit(): void {
    this.totalAmount = this.cartService.getTotalAmount()
    this.cartService.totalAmount$.subscribe((value) => {
      this.totalAmount = value
    })
    this.cartService.servicesAddedCart$.subscribe((value) => {
      this.servicesInCart = value
      this.numberInCart = this.servicesInCart.length
    })    
  }
  public onRemoveService(service: Services){
    this.cartService.removeServiceToCart(service)
    this.totalAmount = this.cartService.getTotalAmount()
  }
}
