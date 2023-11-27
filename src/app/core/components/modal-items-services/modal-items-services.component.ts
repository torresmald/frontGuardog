import {Component, OnInit, Renderer2} from '@angular/core';
import {CourierService} from "../../services/courier/courier.service";
import {Pets} from "../../models/Pets/transformed/PetModel";
import {UsersService} from "../../services/Users/usersService.service";
import {PetsService} from "../../services/Pets/petsService.service";
import {ServicesService} from "../../services/Services/servicesService.service";
import {Services} from "../../models/Services/transformed/ServiceModel";
import {ToastService} from "../../services/Toast/toast.service";
import {CartService} from "../../services/Cart/cart.service";

@Component({
  selector: 'app-modal-items-services',
  templateUrl: './modal-items-services.component.html',
  styleUrls: ['./modal-items-services.component.scss']
})
export class ModalItemsServicesComponent implements OnInit{
  public  pets: Pets[] = []
  public service?: Services

  constructor(private cartService: CartService,private toastService: ToastService,private serviceService:ServicesService ,private petService:PetsService ,private renderer: Renderer2, private courierService: CourierService, private userService: UsersService) {
  }
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'block-scroll');
    this.petService.getPets().subscribe((value) => {
      this.pets = value.filter((pet) => pet.parent?._id === this.userService.getToken())
    })
    // this.serviceService.getSelectService().subscribe(value => this.service = value)
  }
  closeModalService(){
    this.courierService.setItemServiceModal(false)
    this.renderer.removeClass(document.body, 'block-scroll');
  }
  // public onAddService(service: Services){
  //   if (!service.date || !service.pet) {
  //     this.toastService.$message?.next('Selecciona Mascota y Fecha')
  //     this.toastService.showToast()
  //     setTimeout(() => {
  //       this.toastService.closeToast()
  //     }, 2000);
  //     return;
  //   }
  //   this.cartService.addServiceToCart(service)
  // }
  public stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
