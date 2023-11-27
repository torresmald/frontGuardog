import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private modalNav = new BehaviorSubject<boolean>(false);
  private modalCart = new BehaviorSubject<boolean>(false);


  constructor() {
  }

  public setCartModal = (boolean: boolean) => this.modalCart.next(boolean)
  public getCartModal = () => this.modalCart.asObservable()
  public setBooleanNav = (boolean: boolean) => this.modalNav.next(boolean);
  public getModalNav = () => this.modalNav.asObservable();
}
