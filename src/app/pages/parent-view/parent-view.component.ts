import {Component, OnInit} from '@angular/core';
import {Pets} from 'src/app/core/models/Pets/transformed/PetModel';
import {Services} from 'src/app/core/models/Services/transformed/ServiceModel';
import {PetsService} from 'src/app/core/services/Pets/petsService.service';
import {ServicesService} from 'src/app/core/services/Services/servicesService.service';
import {UsersService} from 'src/app/core/services/Users/usersService.service';
import { Appointments } from 'src/app/core/models/Appointments/transformed/AppointmentModel';
import { CourierService } from 'src/app/core/services/Courier/courier.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/core/services/Chat/chat.service';
import { Flowbite } from 'src/app/shared/helpers/decorator/flowbite.decorator';

@Flowbite()

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: []
})

//TODO ARREGLAR VISTA


export class ParentViewComponent implements OnInit {
  public services?: Observable<Services[]>
  public pets: Pets[] = []
  public servicesAddedToCart : Services[] = [];
  public appointments?: Appointments
  public sortPrice?: string
  public sortType?: string
  public isLoaded: boolean = false


  constructor(
      private servicesService: ServicesService,
      private petsService:PetsService,
      private usersService: UsersService,
      private courierService: CourierService,
      private localStorageService: LocalStorageService,
      private navigationService: NavigationService,
      public chatService: ChatService
  ){
  }
  
  ngOnInit(): void {
    this.courierService.getSortPrice().subscribe((value) => {
      this.sortPrice = value
    })
    this.courierService.getSortType().subscribe((value) => {      
      this.sortType = value
    })
    const token = this.usersService.getToken();
    this.services = this.servicesService.getServices()
     this.petsService.getPets().subscribe((value:Pets[]):void => {
      if(value){
        this.isLoaded = true
        this.pets = value.filter((pet) => pet.parent?._id === token)       
      }
     })
     const dataStorage = this.localStorageService.getLocalItem(this.localStorageService.TOKEN_KEY_CART)
      this.servicesAddedToCart = dataStorage ? JSON.parse(dataStorage) : null
  }

  public openMenuMobile() {
    this.courierService.setPetModal(true);
}

  public onSubmit(){
    this.navigationService.onNavigate('/checkout')
  }

  public onShowFiltersModal(){
    this.courierService.setFiltersModal(true)
  }
}
