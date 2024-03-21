import { Component, OnInit, Renderer2 } from '@angular/core';
import { CourierService } from '../../services/courier/courier.service';
import { Pets } from '../../models/Pets/transformed/PetModel';
import { UsersService } from '../../services/Users/usersService.service';
import { PetsService } from '../../services/Pets/petsService.service';
import { ServicesService } from '../../services/Services/servicesService.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { ToastService } from '../../services/Toast/toast.service';
import { CartService } from '../../services/Cart/cart.service';
import { AppointmentsService } from '../../services/Appointmet/appointmentsService.service';
import { Appointments } from '../../models/Appointments/transformed/AppointmentModel';
import { format } from 'date-fns';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Trainers } from '../../models/Trainers/transformed/TrainerModel';
import { TrainerService } from '../../services/Trainers/trainersService.service';

const STARTHOUR = 10;
const ENDHOUR = 19;

@Component({
  selector: 'app-modal-items-services',
  templateUrl: './modal-items-services.component.html',
  styleUrls: ['./modal-items-services.component.scss'],
})
export class ModalItemsServicesComponent implements OnInit {
  public pets: Pets[] = [];
  public petId: string = '';
  public service: Services | null = null;
  public appointments?: Appointments[];
  public datesToDisable: any;
  public hours: string[] = [];
  public selectedHour!: string;
  public hoursBusy : string[] = [];
  public showHours:boolean = false;
  public trainers?: Trainers[]
  public trainerSelected : string = ''

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private serviceService: ServicesService,
    private petService: PetsService,
    private renderer: Renderer2,
    private courierService: CourierService,
    private userService: UsersService,
    private appointmentsService: AppointmentsService,
    private trainersService: TrainerService
  ) {}
  ngOnInit(): void {    
    for (let hour = STARTHOUR; hour <= ENDHOUR; hour++) {
      this.hours.push(hour + ':00');
    }
    this.renderer.addClass(document.body, 'block-scroll');
    this.petService.getPets().subscribe((value: Pets[]): void => {
      this.pets = value.filter(
        (pet: Pets): boolean => pet.parent?._id === this.userService.getToken()
      );
    });
    this.serviceService
      .getSelectService()
      .subscribe((value) => (this.service = value));
    this.trainersService.getTrainers().subscribe((trainers) => {
      this.trainers = trainers      
    })
  }
  closeModalService(): void {
    this.courierService.setItemServiceModal(false);
    this.renderer.removeClass(document.body, 'block-scroll');
  }
  public onAddHour(hour: string) {
    this.selectedHour = hour;
  }

  public selectPetId(event: any) {
    const petId: string | null = event?.target?.value || null;
    if (petId) {
      this.petId = petId;
    }
  }

  public onSelectTrainer(event: any){
    this.trainerSelected = event.target.value
  }


  public disabledDates = (date: Date | null): boolean => {
    if (date) {      
      const today = new Date();
      const day = (date || today).getDay();
      return  date >= today && day !== 0 && day !== 6;
    }
    return true;
  };
  public onRequestHours(event: MatDatepickerInputEvent<Date>){
    this.hoursBusy = []
    this.selectedHour = ''
    this.showHours = true
    if(event){
      const fechaFormateada = event.value ? format(event.value, 'dd/MM/yyyy') : '';
      this.appointmentsService.getAppointmentsDate(fechaFormateada).subscribe((appointments) => {
        appointments.map((appointment) => {
          this.hoursBusy.push(appointment.hour)          
        })
      }
      )
    }
  }

  public onAddService(service: Services): void {
    service.hour = this.selectedHour;
    service.trainer = this.trainerSelected
    if (!service.date || !service.pet || !this.selectedHour || !this.trainerSelected) {
      this.toastService.$message?.next('Selecciona Todos los Campos');
      this.toastService.showToast();
      setTimeout((): void => {
        this.toastService.closeToast();
      }, 2000);
      return;
    }
    this.renderer.removeClass(document.body, 'block-scroll');
    this.cartService.addServiceToCart(service, this.petId);
    this.courierService.updateServiceInCart(service._id, true);
    this.courierService.setItemServiceModal(false);
  }

  
}
