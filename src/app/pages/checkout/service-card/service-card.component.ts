import { Component, Input, OnInit } from '@angular/core';
import { Services } from '../../../core/models/Services/transformed/ServiceModel';
import { PetsService } from '../../../core/services/Pets/petsService.service';
import { Pets } from '../../../core/models/Pets/transformed/PetModel';
import { CourierService } from 'src/app/core/services/Courier/courier.service';
import { CartService } from 'src/app/core/services/Cart/cart.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: [],
})
export class ServiceCardComponent implements OnInit {
  @Input() service?: Services;
  @Input() servicesAddedToCart: Services[];

  public pet?: Observable<Pets>;
  public isServiceInCart: boolean = false;
  public trainerName?: Observable<Trainers | undefined>;

  constructor(
    private petsService: PetsService,
    private cartService: CartService,
    private courierService: CourierService,
    private trainersService: TrainerService
  ) {
    this.servicesAddedToCart = [];
  }
  ngOnInit() {
    this.trainerName = this.trainersService
      .getTrainers()
      .pipe(
        map((trainers) =>
          trainers.find((traine) => traine._id === this.service?.trainer)
        )
      );

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
      this.pet = this.petsService.getPet(this.service.petId);
  }

  public onRemoveService(service: Services) {
    this.resetService(service)
    if (service) this.courierService.updateServiceInCart(service?._id, false);
    this.cartService.removeServiceToCart(service);
  }

  public resetService(service: Services){
    service.date = '';
    service.pet = '';
    service.hour = '';
    service.trainer = '';
  }
}
