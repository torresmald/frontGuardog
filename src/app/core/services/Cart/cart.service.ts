import { Injectable } from '@angular/core';
// import { ModalService } from '../Modal/modal.service';
import { Services } from '../../models/Services/transformed/ServiceModel';
import {BehaviorSubject} from 'rxjs';
import { ToastService } from '../Toast/toast.service';
import {LocalStorageService} from "../LocalStorage/local-storage.service";

const IVA = 21;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public services: Services[] = []
  private requestedServices: BehaviorSubject<Services[]> = new BehaviorSubject<Services[]>([])
  private subtotalAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private taxes: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private totalAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0)


  constructor(
      // private modalService: ModalService,
      private toastService: ToastService,
      private localStorageService: LocalStorageService,
  ) {
    this.localStorageService.getLocalStorage().subscribe( (data) => {
      this.requestedServices.next(data || [])
      this.updateTotal(undefined, "addition");
    })

  }
  public getCartServices = () => {
    let cart: Services[] | null = []
    this.localStorageService.getLocalStorage().subscribe(value => cart = value)
    return cart
  }
  public addServiceToCart(service: Services, petId: string): void{    
    service.petId = petId;
    this.requestedServices.next([...this.requestedServices.value, service])
    this.updateTotal(undefined, "addition")
    this.localStorageService.setLocalStorage(this.requestedServices.value)
    this.toastService.$message?.next('Añadido con Éxito');
    this.toastService.showToast();
    setTimeout(() => {
      this.toastService.closeToast();
    }, 3000);
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
  public  getSubtotalAmount(){
    return this.subtotalAmount.asObservable()
  }
  public  getTaxes(){
    return this.taxes.asObservable()
  }
  public  getTotalAmount(){
    return this.totalAmount.asObservable()
  }
  private updateTotal(service: Services | undefined ,operator: string){
    switch (operator) {
      case "addition":
        this.subtotalAmount.next(this.requestedServices.value.reduce((acc:number, total:Services) => acc + total.price,  0))
        this.taxes.next(this.subtotalAmount.value * IVA / 100)
        this.totalAmount.next(this.subtotalAmount.value + this.taxes.value)
            break;
      case "subtraction":
        this.subtotalAmount.next(service? this.subtotalAmount.value - service.price : this.subtotalAmount.value)
            break;
    }
  }

}
