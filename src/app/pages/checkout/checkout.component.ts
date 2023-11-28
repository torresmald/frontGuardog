import {Component, OnInit} from '@angular/core';
import {Appointments} from 'src/app/core/models/Appointments/transformed/AppointmentModel';
import {Services} from 'src/app/core/models/Services/transformed/ServiceModel';
import {UsersService} from 'src/app/core/services/Users/usersService.service';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {PetsService} from 'src/app/core/services/Pets/petsService.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CartService} from "../../core/services/Cart/cart.service";
import {Pets} from "../../core/models/Pets/transformed/PetModel";

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public checkoutForm?: FormGroup;
  public appointments: Appointments[] = [];
  public servicesInCart: Services[] = [];
  public petImage?: string;
  public subTotal:number = 0;
  public total: number = 0;
  public IVA: number = 0;

  constructor(
    private petsService: PetsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private CartService: CartService
  ) {
  }
  ngOnInit(): void {
    this.servicesInCart = this.CartService.getCartServices()
    this.CartService.getTotalAmount().subscribe(value => this.subTotal = value)
    this.IVA = ((this.subTotal * 21) / 100)
    this.total = this.subTotal + this.IVA
    console.log(this.servicesInCart)
    // TODO AQUI ES GetPET con elID que tengo el localStorage
    // this.checkoutForm = this.formBuilder.group({
    //   services: new FormControl(''),
    // });
    // this.petsService.getPet()
  }

  public onSubmit() {
    console.log(this.checkoutForm?.value);
  }
}
