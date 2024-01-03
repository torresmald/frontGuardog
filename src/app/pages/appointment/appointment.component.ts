import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/core/models/Appointments/transformed/AppointmentModel';
import { AppointmentsService } from 'src/app/core/services/Appointmet/appointmentsService.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  public appointment!: Appointments;
  public id: string = ''

  constructor(private appointmentsService: AppointmentsService,private route: ActivatedRoute, private modalService: ModalService, private router: Router){}

  ngOnInit(): void {
  
    this.route.params.subscribe((value) => {
      this.id = value['id']
    })
    this.appointmentsService.getAppointment(this.id).subscribe((value) => {
      this.appointment = value      
    })
  }

  public onCancelAppointment(id: string){
    console.log(id);
    this.appointmentsService.deleteAppointment(id).subscribe(value => {
      if(value){
        this.modalService.$message?.next('Cita Cancelada');
        this.modalService.showModal();
        setTimeout(() => {
          this.router.navigate(['/parent-view']);
        }, 1000);
      }
      
    }) 
  }
}
