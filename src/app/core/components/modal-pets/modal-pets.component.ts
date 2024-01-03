import { Component,  OnInit } from '@angular/core';
import { CourierService } from '../../services/courier/courier.service';
import { NavigationEnd, Router } from '@angular/router';
import { Pets } from '../../models/Pets/transformed/PetModel';
import { UsersService } from '../../services/Users/usersService.service';
import { PetsService } from '../../services/Pets/petsService.service';
import { AppointmentsService } from '../../services/Appointmet/appointmentsService.service';
import { Appointments } from '../../models/Appointments/transformed/AppointmentModel';
@Component({
  selector: 'app-modal-pets',
  templateUrl: './modal-pets.component.html',
  styleUrls: ['./modal-pets.component.scss'],
})
export class ModalPetsComponent implements OnInit {
  public modalAnimation: boolean = false;
  public pets?: Pets[];
  public appointments: Appointments[] = [];
  public petsAppointments: Pets[] = [];
  


  constructor(
    public courierService: CourierService,
    private _router: Router,
    private petsService: PetsService,
    private usersService: UsersService,
    private appointmentsService: AppointmentsService
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
    this.appointmentsService.getAppointmentsUser(token).subscribe((appointments) => {
      this.appointments = appointments
      appointments.map((appointment) => {
        appointment.services.map((service) => {
          this.petsService.getPet(service.pet).subscribe((pet) => {
              this.petsAppointments?.push(pet); 
          })
        })
      })
    })
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

  public goToDetailAppointment(id: string) {
    this._router.navigate(['appointment', id]);
  }
  
}
