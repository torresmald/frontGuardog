import { Injectable } from '@angular/core';
import { ModalService } from '../Modal/modal.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import {BehaviorSubject} from 'rxjs';
import { ToastService } from '../Toast/toast.service';
import {LocalStorageService} from "../LocalStorage/local-storage.service";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  public services: Services[] = []
  private requestedServices: BehaviorSubject<Services[]> = new BehaviorSubject<Services[]>([])
  private totalAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor(private modalService: ModalService, private toastService: ToastService, private localStorageService: LocalStorageService) {
    this.localStorageService.getLocalStorage().subscribe( (data) => {
      this.requestedServices.next(data || [])
      this.updateTotal(undefined, "addition");
    })

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
    this.updateTotal(undefined, "addition")
    this.localStorageService.setLocalStorage(this.requestedServices.value)
  }

  public removeServiceToCart(service: Services): Services[] | null {
    this.requestedServices.next(this.requestedServices.value.filter((value) => service.name !== value.name))
    this.toastService.$message?.next('Eliminado con Éxito');
    this.toastService.showToast();
    setTimeout(() => {
      this.toastService.closeToast();
    }, 3000);
    this.updateTotal(service, "subtraction" )
    this.localStorageService.setLocalStorage(this.requestedServices.value)
    return this.requestedServices.value;
  }
  public  getTotalAmount(){
    return this.totalAmount.asObservable()
  }
  private updateTotal(service: Services | undefined ,operator: string){
    switch (operator) {
      case "addition":
        this.totalAmount.next(this.requestedServices.value.reduce((acc:number, total:Services) => acc + total.price,  0))
            break;
      case "subtraction":
        this.totalAmount.next(service? this.totalAmount.value - service.price : this.totalAmount.value)
            break;
    }
  }

}
