import { Component,  OnInit } from '@angular/core';
import { CourierService } from '../../services/courier/courier.service';
import { NavigationEnd, Router } from '@angular/router';
import { Pets } from '../../models/Pets/transformed/PetModel';
import { UsersService } from '../../services/Users/usersService.service';
import { PetsService } from '../../services/Pets/petsService.service';
@Component({
  selector: 'app-modal-pets',
  templateUrl: './modal-pets.component.html',
  styleUrls: ['./modal-pets.component.scss'],
})
export class ModalPetsComponent implements OnInit {
  public modalAnimation: boolean = false;
  public pets?: Pets[];


  constructor(
    public courierService: CourierService,
    private _router: Router,
    private petsService: PetsService,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    const token = this.usersService.getToken();

    this.courierService
      .getPetModal()
      .subscribe((value) => (this.modalAnimation = value));
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenuMobile();
      }
    });
    this.petsService.getPets().subscribe((value: Pets[]): void => {
      this.pets = value.filter((pet) => pet.parent?._id === token);
    });
  }

  public closeMenuMobile() {
    this.modalAnimation = false;
    setTimeout(() => {
      this.courierService.setPetModal(false);
    }, 400);
  }

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }
    
  public goToDetail(id: string) {
    this._router.navigate(['pet', id]);
  }
}
