import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointments } from 'src/app/core/models/Appointments/transformed/AppointmentModel';
import { AppointmentsService } from 'src/app/core/services/Appointmet/appointmentsService.service';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss']
})
export class MyAppointmentsComponent {
  public id: string = '';
  public appointments: Appointments[] = [];
  public namePet:string = ''

  constructor(private route: ActivatedRoute, private appointmentsService: AppointmentsService, private petsService: PetsService) {
  }

  ngOnInit(): void {
      this.route.params.subscribe((param) => {
        this.id = param['id']
      })
      this.appointmentsService.getAppointmentsUser(this.id).subscribe((appointments) => {
        this.appointments = appointments        
        this.appointments.map((appointment) => {
          appointment.services.map((service) => {
            this.petsService.getPet(service.pet).subscribe((pet) => {
              this.namePet = pet.name
              console.log(this.namePet);
              console.log(pet);
            })
          })
          
        })
      })
  }
}
