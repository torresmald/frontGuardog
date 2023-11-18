import { Component, OnInit } from '@angular/core';
import { Appointments } from 'src/app/core/models/Appointments/transformed/AppointmentModel';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { AppointmentsService } from 'src/app/core/services/Appointmet/appointmentsService.service';
import { CartService } from 'src/app/core/services/Cart/cart.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public checkoutForm?: FormGroup
  public appointments: Appointments[] = []
  public servicesInCart: Services[] = []
  public pets: Pets[] = []

  constructor(private petsService:PetsService, private appointmentsService: AppointmentsService, private usersService: UsersService, private cartService: CartService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      services: new FormControl(''),
      date: new FormControl(''),
      pet: new FormControl('')
    })
    const token = this.usersService.getToken();   
    this.petsService.getPets().subscribe((value) => {      
      this.pets = value.filter((pet) => pet.parent?._id === token)
    })
    // this.appointmentsService.getAppointmentsUser(token).subscribe((value) => {
    //   console.log(value);

    
    this.servicesInCart = this.cartService.getServicesInCart()
    this.checkoutForm?.get('services')?.setValue(this.servicesInCart);
  }

  public onSubmit(){
    console.log(this.checkoutForm?.value);
    
  }
}