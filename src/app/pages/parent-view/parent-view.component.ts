import { Component, OnInit } from '@angular/core';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';
import { Services } from 'src/app/core/models/Services/transformed/ServiceModel';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { ServicesService } from 'src/app/core/services/Services/servicesService.service';

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.scss']
})
export class ParentViewComponent implements OnInit {
  public services: Services[] = []
  public pets: Pets[] = []
  
  constructor(private servicesService: ServicesService, private petsService:PetsService){}

  public getToken() {  
    const authToken = localStorage.getItem('parents');
    return authToken ? JSON.parse(authToken).parent.email : null;
  }

  ngOnInit(): void {
    const token = this.getToken()
     this.servicesService.getServices().subscribe((value) => {
      this.services = value
     })
     this.petsService.getPets().subscribe((value) => {
      
       this.pets = value.filter((pet) => pet.parent?.email === token)
       console.log(this.pets);
    
     })
     
  }

}
