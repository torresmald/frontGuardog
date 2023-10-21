import { Component, OnInit } from '@angular/core';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { ServicesService } from 'src/app/core/services/Services/servicesService.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.scss']
})
export class ParentViewComponent implements OnInit {
  public services: Services[] = []
  public pets: Pets[] = []
  
  constructor(private servicesService: ServicesService, private petsService:PetsService, private usersService: UsersService){}

 

  ngOnInit(): void {
    const token = this.usersService.getTokenParent();    
     this.servicesService.getServices().subscribe((value) => {
      this.services = value
     })
     this.petsService.getPets().subscribe((value) => {      
       this.pets = value.filter((pet) => pet.parent?.email === token)
     })
  }
}
