import { Component, OnInit } from '@angular/core';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { ServicesService } from 'src/app/core/services/Services/servicesService.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/Modal/modal.service';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.scss']
})
export class ParentViewComponent implements OnInit {
  public services: Services[] = []
  public pets: Pets[] = []
  public requestedServices: Services[] = []
  public totalAmount: number = 0
  
  
  constructor(private servicesService: ServicesService, private petsService:PetsService, private usersService: UsersService, private router: Router, private modalService: ModalService){}

 

  ngOnInit(): void {
    const token = this.usersService.getTokenParent();    
     this.servicesService.getServices().subscribe((value) => {
      this.services = value
     })
     this.petsService.getPets().subscribe((value) => {      
       this.pets = value.filter((pet) => pet.parent?.email === token)
     })
     
  }

  public onAddService(service: Services){
    let isServiceAdded = this.requestedServices.find((reqServ) => reqServ.name === service.name)
    if(isServiceAdded){
      this.modalService.$message?.next('Ya has añadido este servicio')
      this.modalService.showModal()
      return
    }
    this.requestedServices?.push(service)
    this.totalAmount = this.requestedServices.reduce((acc, total) => acc + total.price, 0)
  }

  public onRemoveService(service:Services){
    this.requestedServices = this.requestedServices.filter((value) => service.name != value.name)
    this.totalAmount = this.totalAmount - service.price
  }

  public onSubmit(){
    this.router.navigate(['/checkout'])
  }
}
