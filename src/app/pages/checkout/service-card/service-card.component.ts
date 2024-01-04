import { Component, Input, OnInit } from '@angular/core';
import { Services } from '../../../core/models/Services/transformed/ServiceModel';
import { PetsService } from '../../../core/services/Pets/petsService.service';
import { Pets } from '../../../core/models/Pets/transformed/PetModel';
import { CourierService } from 'src/app/core/services/courier/courier.service';
import { CartService } from 'src/app/core/services/Cart/cart.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service?: Services;
  @Input() servicesAddedToCart: Services[];

  public pet?: Pets;
  public isServiceInCart: Boolean = false;
  public trainerName?: Trainers

  constructor(
    private petsService: PetsService,
    private cartService: CartService,
    private courierService: CourierService,
    private trainersService: TrainerService
  ) {
    this.servicesAddedToCart = [];
  }
  ngOnInit() {
    this.trainersService.getTrainers().subscribe((trainer) => {
      this.trainerName = trainer.find((traine) => traine._id === this.service?.trainer)      
    })
    this.servicesAddedToCart?.find(
      (value) => (this.isServiceInCart = value._id === this.service?._id)
    );
    this.courierService.updateServiceInCart(
      this.service?._id,
      this.isServiceInCart
    );
    this.courierService.getServiceInCart().subscribe((value) => {
      if (this.service) {
        this.isServiceInCart = value[this.service?._id];
      }
    });
    if (this.service?.petId)
      this.petsService
        .getPet(this.service.petId)
        .subscribe((value) => (this.pet = value));
  }

  public onRemoveService(service: Services) {
    service.date = '';
    service.pet = '';
    service.hour = ''
    service.trainer = ''
    if (service) this.courierService.updateServiceInCart(service?._id, false);
    this.cartService.removeServiceToCart(service);
  }
}
