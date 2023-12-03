import {Component, OnInit} from '@angular/core';
import {Services} from 'src/app/core/models/Services/transformed/ServiceModel';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {PetsService} from 'src/app/core/services/Pets/petsService.service';
import {CartService} from "../../core/services/Cart/cart.service";

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public servicesInCart: Services[] = [];
  public petImage?: string;
  public subTotal:number = 0;
  public total: number = 0;
  public IVA: number = 0;

  constructor(
    private petsService: PetsService,
    private CartService: CartService
  ) {
  }
  ngOnInit(): void {
    this.servicesInCart = this.CartService.getCartServices()
    this.CartService.getTotalAmount().subscribe(value => this.subTotal = value)
    this.IVA = ((this.subTotal * 21) / 100)
    this.total = this.subTotal + this.IVA
    // TODO AQUI ES GetPET con elID que tengo el localStorage
  }
  public onSubmit() { // TODO en serviceInCart esta todo lo que necesitas, hay una propiedad llamada petId asociada a cada servicio
    console.log(this.servicesInCart);
  }
}
