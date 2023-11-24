import { Component, OnInit } from '@angular/core';
import { Appointments } from 'src/app/core/models/Appointments/transformed/AppointmentModel';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { CartService } from 'src/app/core/services/Cart/cart.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
const TOKEN_KEY_CART = 'cart';

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
  public pets: Pets[] = [];

  constructor(
    private petsService: PetsService,
    private usersService: UsersService,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    const token = this.usersService.getToken();
    const dataStorage = localStorage.getItem(TOKEN_KEY_CART);
    const dataParsed = dataStorage ? JSON.parse(dataStorage) : null;
    this.servicesInCart = dataParsed;
    this.petsService.getPets().subscribe((value) => {
      this.pets = value.filter((pet) => pet.parent?._id === token);
    });
    // this.appointmentsService.getAppointmentsUser(token).subscribe((value) => {
    //   console.log(value);
    this.servicesInCart.forEach((srv) => {
      this.checkoutForm = this.formBuilder.group({
        services: new FormControl(''),
        date: new FormControl(''),
        pet: new FormControl(''),
      });
      this.checkoutForm?.get('services')?.setValue(this.servicesInCart);
    })
  }

  public onSubmit() {
    console.log(this.checkoutForm?.value);
  }
}
