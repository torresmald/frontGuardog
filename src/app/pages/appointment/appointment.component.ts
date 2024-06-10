import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointments } from 'src/app/core/models/Appointments/transformed/AppointmentModel';
import { AppointmentsService } from 'src/app/core/services/Appointmet/appointmentsService.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: []
})
export class AppointmentComponent implements OnInit {

  public appointment!: Observable<Appointments>;
  public id: string = ''

  constructor(private appointmentsService: AppointmentsService,private route: ActivatedRoute, private modalService: ModalService, private navigationService: NavigationService){}

  ngOnInit(): void {
  
    this.route.params.subscribe((value) => {
      this.id = value['id']
    })
    this.appointment =  this.appointmentsService.getAppointment(this.id)
  }

  public onCancelAppointment(id: string){
    this.appointmentsService.deleteAppointment(id).subscribe(value => {
      if(value){
        this.modalService.$message?.next('Cita Cancelada');
        this.modalService.showModal('other');
        setTimeout(() => {
          this.navigationService.onNavigate('/parent-view')
        }, 1000);
      }
      
    }) 
  }
}
