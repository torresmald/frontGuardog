import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointments } from 'src/app/core/models/Appointments/transformed/AppointmentModel';
import { AppointmentsService } from 'src/app/core/services/Appointmet/appointmentsService.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: [],
})
export class MyAppointmentsComponent {
  public id: string = '';
  public appointments: Appointments[] = [];
  public namePet: string = '';

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService,
    private petsService: PetsService,
    private modalService: ModalService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    this.appointmentsService
      .getAppointmentsUser(this.id)
      .subscribe((appointments) => {
        this.appointments = appointments;
        this.appointments.map((appointment) => {
          appointment.services.map((service) => {
            this.petsService.getPet(service.pet).subscribe((pet) => {
              this.namePet = pet.name;
            });
          });
        });
      });
  }

  public onCancelAppointment(id: string) {
    this.appointmentsService.deleteAppointment(id).subscribe((value) => {
      if (value) {
        this.modalService.$message?.next('Cita Cancelada');
        this.modalService.showModal();
        setTimeout(() => {
          this.navigationService.onNavigate('/trainer-view');
        }, 1000);
      }
    });
  }
}
