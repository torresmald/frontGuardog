import {Component, OnInit, Renderer2} from '@angular/core';
import {CourierService} from "../../services/courier/courier.service";
import {Pets} from "../../models/Pets/transformed/PetModel";
import {UsersService} from "../../services/Users/usersService.service";
import {PetsService} from "../../services/Pets/petsService.service";
import {ServicesService} from "../../services/Services/servicesService.service";
import {Services} from "../../models/Services/transformed/ServiceModel";
import {ToastService} from "../../services/Toast/toast.service";
import {CartService} from "../../services/Cart/cart.service";
import { AppointmentsService } from '../../services/Appointmet/appointmentsService.service';
import { Appointments } from '../../models/Appointments/transformed/AppointmentModel';

@Component({
  selector: 'app-modal-items-services',
  templateUrl: './modal-items-services.component.html',
  styleUrls: ['./modal-items-services.component.scss']
})
export class ModalItemsServicesComponent implements OnInit{
  public  pets: Pets[] = []
  public  petId: string = ""
  public service: Services | null = null
  public appointments?: Appointments[]
  public datesToDisable: any

  constructor(
      private cartService: CartService,
      private toastService: ToastService,
      private serviceService:ServicesService ,
      private petService:PetsService ,
      private renderer: Renderer2,
      private courierService: CourierService,
      private userService: UsersService,
      private appointmentsService: AppointmentsService
  )
  {}
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'block-scroll');
    this.petService.getPets().subscribe((value:Pets[]):void => {
      this.pets = value.filter((pet:Pets):boolean => pet.parent?._id === this.userService.getToken())
    })
    this.serviceService.getSelectService().subscribe(value => this.service = value)
    if(this.service){
      this.appointmentsService.getAppointments().subscribe((value)=> {
        value.map((appointment) => {
          appointment.services.map((service) => {
            this.datesToDisable = service.date
            console.log(this.datesToDisable);
            
          })
          
        })       
      })
    }
   
  }
  closeModalService() :void{
    this.courierService.setItemServiceModal(false)
    this.renderer.removeClass(document.body, 'block-scroll');
  }
  public onAddService(service: Services): void{    
    if (!service.date || !service.pet) {
      this.toastService.$message?.next('Selecciona Mascota y Fecha')
      this.toastService.showToast()
      setTimeout((): void => {
        this.toastService.closeToast()
      }, 2000);
      return;
    }
    this.renderer.removeClass(document.body, 'block-scroll');
    this.cartService.addServiceToCart(service, this.petId)
    this.courierService.updateServiceInCart(service._id, true);
    this.courierService.setItemServiceModal(false)
  }
  public selectPetId(event: any) {
    const petId: string | null = event?.target?.value || null;
    if (petId) {
        this.petId = petId;
    } 
}

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  public disabledDates = (date: Date | null): boolean => {
    const day = (date || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}
