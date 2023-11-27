import { Injectable } from '@angular/core';
import { ModalService } from '../Modal/modal.service';
import { ServicesService } from 'src/app/core/services/Services/servicesService.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import {BehaviorSubject} from 'rxjs';
import { ToastService } from '../Toast/toast.service';
import { UpdatedStylesData } from '../Services/helpers/typeStylesChange';
import {LocalStorageService} from "../LocalStorage/local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  public services: Services[] = []
  public requestedServices: BehaviorSubject<Services[]> = new BehaviorSubject<Services[]>([])

  constructor(private modalService: ModalService, private serviceService: ServicesService, private toastService: ToastService, private localStorageService: LocalStorageService) {
    this.localStorageService.getLocalStorage().subscribe( data => this.requestedServices.next(data || []))
  }
  public addServiceToCart(service: Services): void{
    const serviceAdded: Services | undefined = this.requestedServices.value.find((reqServ) => reqServ.name === service.name);
    if (serviceAdded) {
      this.modalService.$message?.next('Ya has añadido este servicio');
      this.modalService.showModal();
      return ;
    }
    this.toastService.$message?.next('Añadido con Éxito');
    this.toastService.showToast();
    setTimeout(() => {
      this.toastService.closeToast();
    }, 3000);
    this.requestedServices.next([...this.requestedServices.value, service])
    const dataToUpdate: UpdatedStylesData = {
      service,
      inCart: true
    };
    this.serviceService.updateStylesImage(dataToUpdate);
    this.localStorageService.setLocalStorage(this.requestedServices.value)
  }

  public removeServiceToCart(service: Services): Services[] | null {
    this.requestedServices.next(this.requestedServices.value.filter((value) => service.name !== value.name))
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
    this.localStorageService.setLocalStorage(this.requestedServices.value)
    return this.requestedServices.value;
  }

}
