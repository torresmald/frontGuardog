import { Injectable, OnInit } from '@angular/core';
import { ModalService } from '../Modal/modal.service';
import { ServicesService } from 'src/app/core/services/Services/servicesService.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import { Subject } from 'rxjs';
import { ToastService } from '../Toast/toast.service';
import { UpdatedStylesData } from '../Services/helpers/typeStylesChange';
const TOKEN_KEY_CART = 'cart';
const dataStorage = localStorage.getItem(TOKEN_KEY_CART)
const dataParsed = dataStorage ? JSON.parse(dataStorage) : null


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
    if(dataParsed){
      let total = dataParsed.reduce((acc:number, total:Services) => acc + total.price,  0)
      return total
    } else{
      let total = this.requestedServices.reduce((acc, total) => acc + total.price,  0)
      this.totalAmount$.next(total)
      return total
    }

  }

  public addServiceToCart(service: Services): Services[] | null {
    const storedServices = localStorage.getItem(TOKEN_KEY_CART);
    if (storedServices) {
      this.requestedServices = JSON.parse(storedServices);
    }
  
    this.serviceAdded = this.requestedServices.find((reqServ) => reqServ.name === service.name);
  
    if (this.serviceAdded) {
      this.modalService.$message?.next('Ya has añadido este servicio');
      this.modalService.showModal();
      return null;
    }
  
    this.toastService.$message?.next('Añadido con Éxito');
    this.toastService.showToast();
    setTimeout(() => {
      this.toastService.closeToast();
    }, 3000);
    this.requestedServices = [...this.requestedServices, service];
    this.totalAmount$.next(this.getTotalAmount());
    const dataToUpdate: UpdatedStylesData = {
      service,
      inCart: true
    };
    this.serviceService.updateStylesImage(dataToUpdate);
    this.servicesAddedCart$.next(this.requestedServices);
    localStorage.setItem(TOKEN_KEY_CART, JSON.stringify(this.requestedServices));
  
    return this.requestedServices;
  }
  

  public removeServiceToCart(service: Services): Services[] | null {
    const storedServices = localStorage.getItem(TOKEN_KEY_CART);
    if (storedServices) {
      this.requestedServices = JSON.parse(storedServices);
    }
    this.requestedServices = this.requestedServices.filter((value) => service.name !== value.name);
    this.totalAmount$.next(this.getTotalAmount() - service.price);
    const dataToUpdate: UpdatedStylesData = {
      service,
      inCart: false
    };
    this.serviceService.updateStylesImage(dataToUpdate);
    this.toastService.$message?.next('Eliminado con Éxito');
    this.toastService.showToast();
    setTimeout(() => {
      this.toastService.closeToast();
    }, 3000);
    this.servicesAddedCart$.next(this.requestedServices);
    localStorage.setItem(TOKEN_KEY_CART, JSON.stringify(this.requestedServices));
    return this.requestedServices;
  }
  

  public getServicesInCart(): Services[]{
    if(dataParsed){
      return dataParsed
    }
    return this.requestedServices
  }

}
