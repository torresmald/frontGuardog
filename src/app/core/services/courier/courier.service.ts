import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private modalNav:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private modalCart:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private modalItemService: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)


  constructor() {
  }
  public setItemServiceModal = (boolean: boolean) => this.modalItemService.next(boolean)
  public getItemServiceModal = () => this.modalItemService.asObservable()
  public setCartModal = (boolean: boolean) => this.modalCart.next(boolean)
  public getCartModal = () => this.modalCart.asObservable()
  public setBooleanNav = (boolean: boolean) => this.modalNav.next(boolean);
  public getModalNav = () => this.modalNav.asObservable();
}
