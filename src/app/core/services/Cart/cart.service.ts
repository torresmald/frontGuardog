import { Injectable, OnInit } from '@angular/core';
import { ModalService } from '../Modal/modal.service';
import { ServicesService } from 'src/app/core/services/Services/servicesService.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { Observable, Subject } from 'rxjs';
import { ToastService } from '../Toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  public services: Services[] = []
  public requestedServices: Services[] = []
  public totalAmount$: Subject<number> = new Subject<number> ()
  public serviceAdded : Services | undefined ;
  public servicesAddedCart$ : Subject<Services[]> = new Subject<Services[]>()


  constructor(private modalService: ModalService, private serviceService: ServicesService, private toastService: ToastService) { }
  
  ngOnInit(): void {
      this.servicesAddedCart$.next(this.requestedServices)
  }
  public getTotalAmount(): number {
    let total = this.requestedServices.reduce((acc, total) => acc + total.price,  0)
    this.totalAmount$.next(total)
    return total
  }

  public addServiceToCart(service: Services): Services[] | null{
    this.serviceAdded = this.requestedServices.find((reqServ) => reqServ.name === service.name)    
    if(this.serviceAdded){
      this.modalService.$message?.next('Ya has añadido este servicio')
      this.modalService.showModal()
      return null
    }
    this.toastService.$message?.next('Añadido con Éxito')
    this.toastService.showToast()
    setTimeout(() => {
      this.toastService.closeToast()
    }, 3000);
    this.requestedServices?.push(service)
    this.totalAmount$.next(this.getTotalAmount())
    this.serviceService.updateStylesImage(service)
    this.servicesAddedCart$.next(this.requestedServices)
    console.log(this.requestedServices);
    
    return this.requestedServices
  }

  public removeServiceToCart(service:Services) : Services[] | null{
    if(this.requestedServices){
      this.requestedServices = this.requestedServices.filter((value) => service.name != value.name)
      this.totalAmount$.next(this.getTotalAmount() - service.price)
    }
    this.toastService.$message?.next('Eliminado con Éxito')
    this.toastService.showToast()
    setTimeout(() => {
      this.toastService.closeToast()
    }, 3000);
    this.servicesAddedCart$.next(this.requestedServices)
    return this.requestedServices
  }

  public getServicesInCart(): Services[]{
    return this.requestedServices
  }

}
