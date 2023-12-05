import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CartService } from '../../core/services/Cart/cart.service';
import { CouponsService } from 'src/app/core/services/Coupons/coupons.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';

registerLocaleData(localeEs, 'es');
const TOKEN_KEY_CART = 'cart'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public servicesInCart: Services[] = [];
  public petImage?: string;
  public subTotal: number = 0;
  public total: number = 0;
  public taxes: number = 0;
  public coupon: string = '';
  public discount: number = 0;
  public servicesAddedToCart: Services[] = []


  constructor(
    private CartService: CartService,
    private couponsService: CouponsService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.servicesInCart = this.CartService.getCartServices();
    this.CartService.getSubtotalAmount().subscribe(
      (value) => (this.subTotal = value)
    );
    this.CartService.getTaxes().subscribe(
      (value) => (this.taxes = value)
    );
    this.CartService.getTotalAmount().subscribe(
      (value) => (this.total = value)
    );
    // TODO del servicio
    const dataStorage = localStorage.getItem(TOKEN_KEY_CART)
    this.servicesAddedToCart = dataStorage ? JSON.parse(dataStorage) : null
  }
  public onApplyCoupon(coupon: string) {
    this.couponsService.getDailyCoupon().subscribe((value) => {
      if(coupon === value.name){
        this.discount = value.discount
      }
      if (this.discount) {
        // TODO ver descuentos
        this.CartService.getSubtotalAmount().subscribe(value => this.subTotal = value - (value * this.discount / 100));
        this.CartService.getTaxes().subscribe((value) => value);
        this.CartService.getTotalAmount().subscribe((value) => this.total = this.subTotal +  this.taxes);
        this.toastService.$message?.next('Cupon Aplicado');
        this.toastService.showToast()
        setTimeout(() => {
          this.toastService.closeToast()
        }, 2000);
      }
    })    
  }
  
  public onSubmit() {
    // TODO en serviceInCart esta todo lo que necesitas, hay una propiedad llamada petId asociada a cada servicio
    console.log(this.servicesInCart);
  }
}
