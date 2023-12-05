import { Component, Input, OnInit } from '@angular/core';
import { Services } from '../../../core/models/Services/transformed/ServiceModel';
import { PetsService } from '../../../core/services/Pets/petsService.service';
import { Pets } from '../../../core/models/Pets/transformed/PetModel';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service?: Services;
  public pet?: Pets;

  constructor(private petsService: PetsService) {}
  ngOnInit() {
    if (this.service?.petId)
      this.petsService
        .getPet(this.service.petId)
        .subscribe((value) => (this.pet = value));
  }
}
