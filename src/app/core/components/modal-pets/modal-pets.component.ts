import { Component, OnInit } from '@angular/core';
import { CourierService } from '../../services/Courier/courier.service';
import { NavigationEnd, Router } from '@angular/router';
import { Pets } from '../../models/Pets/transformed/PetModel';
import { UsersService } from '../../services/Users/usersService.service';
import { PetsService } from '../../services/Pets/petsService.service';
import { AppointmentsService } from '../../services/Appointmet/appointmentsService.service';
import { Appointments } from '../../models/Appointments/transformed/AppointmentModel';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
@Component({
  selector: 'app-modal-pets',
  templateUrl: './modal-pets.component.html',
  styleUrls: ['./modal-pets.component.scss'],
})
export class ModalPetsComponent implements OnInit {
  public modalAnimation?: Observable<boolean>;
  public pets?:  Pets[];
  public appointments: Appointments[] = [];
  public petsAppointments: Pets[] = [];

  constructor(
    public courierService: CourierService,
    private router: Router,
    private petsService: PetsService,
    private usersService: UsersService,
    private appointmentsService: AppointmentsService,
    private navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    const userId = this.usersService.getToken();

    this.modalAnimation = this.courierService.getPetModal()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenuMobile();
      }
    });
    this.petsService.getPets().subscribe((value: Pets[]): void => {
      this.pets = value.filter((pet) => pet.parent?._id === userId);
    });
    this.appointmentsService
      .getAppointmentsUser(userId)
      .subscribe((appointments) => {
        this.appointments = appointments;
        appointments.map((appointment) => {
          appointment.services.map((service) => {
            this.petsService.getPet(service.pet).subscribe((pet) => {              
              this.petsAppointments?.push(pet);
            });
          });
        });
      });
  }

  public closeMenuMobile() {
    this.modalAnimation?.subscribe();
    setTimeout(() => {
      this.courierService.setPetModal(false);
    }, 400);
  }

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  public goToDetail(id: string) {
     this.navigationService.onNavigate('pet', id)
  }

  public goToDetailAppointment(id: string) {
    this.navigationService.onNavigate('appointment', id)
  }
}
