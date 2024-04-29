import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { CourierService } from '../../services/Courier/courier.service';
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
import { DateAdapter } from '@angular/material/core';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-modal-items-services',
  templateUrl: './modal-items-services.component.html',
  styleUrls: [],
})
export class ModalItemsServicesComponent implements OnInit {

  @Input()
  public typeModal?: string | null
  public pets: Pets[] = [];
  public petId: string = '';
  public service: Services | null = null;
  public appointments?: Appointments[];
  public datesToDisable: any;
  // public hours: string[] = [];
  public selectedHour!: string;
  public hoursBusy: string[] = [];
  public showHours: boolean = false;
  public trainers!: Observable<Trainers[]>;
  public trainerSelected: string = '';
  public hours : string[] = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private serviceService: ServicesService,
    private petService: PetsService,
    private renderer: Renderer2,
    private courierService: CourierService,
    private userService: UsersService,
    private appointmentsService: AppointmentsService,
    private trainersService: TrainerService,
    private date: DateAdapter<Date>
  ) {}
  
  
  
  
  
  ngOnInit(): void {    
    if(this.typeModal === 'cart'){
      this.date.getFirstDayOfWeek = () => 1;
      this.trainers = this.trainersService.getTrainers()
      this.petService.getPets().subscribe((value: Pets[]): void => {
        this.pets = value.filter(
          (pet: Pets): boolean => pet.parent?._id === this.userService.getToken()
        );
      });
    }
    this.renderer.addClass(document.body, 'block-scroll');
    this.serviceService
      .getSelectService()
      .subscribe((value) => (this.service = value));
  }
  closeModalService() {
    this.courierService.setItemServiceModal('');
    this.renderer.removeClass(document.body, 'block-scroll');
  }
  public onAddHour(hour: string) {
    this.selectedHour = hour;
  }

  public selectPetId(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.petId = target?.value;
  }

  public onSelectTrainer(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.trainerSelected = target.value;
  }

  public disabledDates = (date: Date | null): boolean => {
    if (date) {
      const today = new Date();
      const day = (date || today).getDay();
      return date >= today && day !== 0 && day !== 6;
    }
    return true;
  };
  public onRequestHours(event: MatDatepickerInputEvent<Date>) {
    this.hoursBusy = [];
    this.selectedHour = '';
    this.showHours = true;
    if (event) {
      const fechaFormateada = event.value
        ? format(event.value, 'dd/MM/yyyy')
        : '';
      this.appointmentsService
        .getAppointmentsDate(fechaFormateada)
        .subscribe((appointments) => {
          appointments.map((appointment) => {
            this.hoursBusy.push(appointment.hour);
          });
        });
    }
  }

  public onAddService(service: Services): void {
    service.hour = this.selectedHour;
    service.trainer = this.trainerSelected;
    if (
      !service.date ||
      !service.pet ||
      !this.selectedHour ||
      !this.trainerSelected
    ) {
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
    this.courierService.setItemServiceModal('');
  }
}
