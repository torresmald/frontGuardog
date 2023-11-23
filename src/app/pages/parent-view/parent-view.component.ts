import { Component, OnInit } from '@angular/core';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { ServicesService } from 'src/app/core/services/Services/servicesService.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';

import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/Cart/cart.service';

const TOKEN_KEY_CART = 'cart'

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.scss']
})
export class ParentViewComponent implements OnInit {
  public services: Services[] = []
  public pets: Pets[] = []
  public requestedServices: Services[] | null = []
  public totalAmount: number = 0
  public servicesAddedToCart : Services[] | undefined ;
  public serviceAddedToCart : Services | undefined ;

  
  
  constructor(private servicesService: ServicesService, private petsService:PetsService, private usersService: UsersService, private router: Router, private cartService: CartService){}

 

  ngOnInit(): void {
    const token = this.usersService.getToken();   
    // TODO Pype async 
     this.servicesService.getServices().subscribe((value) => {
      this.services = value
     })
     this.petsService.getPets().subscribe((value) => {      
       this.pets = value.filter((pet) => pet.parent?._id === token)
     })
     const dataStorage = localStorage.getItem(TOKEN_KEY_CART)
     const dataParsed = dataStorage ? JSON.parse(dataStorage) : null
     this.servicesAddedToCart = dataParsed

  }

  public onAddService(service: Services){
    this.requestedServices = this.cartService.addServiceToCart(service) 
       
  }

  public onRemoveService(service:Services){
    this.requestedServices = this.cartService.removeServiceToCart(service)
  }

  public onSubmit(){
    this.router.navigate(['/checkout'])
  }

}
