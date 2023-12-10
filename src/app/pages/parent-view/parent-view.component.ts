import {Component, OnInit} from '@angular/core';
import {Pets} from 'src/app/core/models/Pets/transformed/PetModel';
import {Services} from 'src/app/core/models/Services/transformed/ServiceModel';
import {PetsService} from 'src/app/core/services/Pets/petsService.service';
import {ServicesService} from 'src/app/core/services/Services/servicesService.service';
import {UsersService} from 'src/app/core/services/Users/usersService.service';
import {Router} from '@angular/router';
import { AppointmentsService } from 'src/app/core/services/Appointmet/appointmentsService.service';
import { Appointments } from 'src/app/core/models/Appointments/transformed/AppointmentModel';
const TOKEN_KEY_CART = 'cart'

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.scss']
})
export class ParentViewComponent implements OnInit {
  public services: Services[] = []
  public pets: Pets[] = []
  public servicesAddedToCart : Services[];
  public appointments?: Appointments

  constructor(
      private servicesService: ServicesService,
      private petsService:PetsService,
      private usersService: UsersService,
      private router: Router,
      private appointmentsService: AppointmentsService
  ){
      this.servicesAddedToCart = []
  }

  ngOnInit(): void {
    const token = this.usersService.getToken();
    // TODO Pype async
     this.servicesService.getServices().subscribe((value:Services[]) => {
      this.services = value
     })
     this.petsService.getPets().subscribe((value:Pets[]):void => {
       this.pets = value.filter((pet) => pet.parent?._id === token)
     })
     // TODO del servicio
     const dataStorage = localStorage.getItem(TOKEN_KEY_CART)
      this.servicesAddedToCart = dataStorage ? JSON.parse(dataStorage) : null

      // this.appointmentsService.getAppointmentsDate()
  }

  public onSubmit(){
    this.router.navigate(['/checkout'])
  }

}
