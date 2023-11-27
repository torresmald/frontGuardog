import {Component, OnInit} from '@angular/core';
import {Pets} from 'src/app/core/models/Pets/transformed/PetModel';
import {Services} from 'src/app/core/models/Services/transformed/ServiceModel';
import {PetsService} from 'src/app/core/services/Pets/petsService.service';
import {ServicesService} from 'src/app/core/services/Services/servicesService.service';
import {UsersService} from 'src/app/core/services/Users/usersService.service';

import {Router} from '@angular/router';
import {CartService} from 'src/app/core/services/Cart/cart.service';
import {ToastService} from 'src/app/core/services/Toast/toast.service';

const TOKEN_KEY_CART = 'cart'

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.scss']
})
export class ParentViewComponent implements OnInit {
  public services: Services[] = []
  public pets: Pets[] = []
  public servicesAddedToCart : Services[] | undefined ;

  constructor(private servicesService: ServicesService, private petsService:PetsService, private usersService: UsersService, private router: Router, private cartService: CartService, private toastService:ToastService){}

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
      this.servicesAddedToCart = dataStorage ? JSON.parse(dataStorage) : null
  }

  public onAddService(service: Services){
    if (!service.date || !service.pet) {
      this.toastService.$message?.next('Selecciona Mascota y Fecha')
      this.toastService.showToast()
      setTimeout(() => {
        this.toastService.closeToast()
      }, 2000);
      return;
    }
    this.cartService.addServiceToCart(service)

  }

  public onSubmit(){
    this.router.navigate(['/checkout'])
  }

}
