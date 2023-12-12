import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private modalNav:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private modalCart:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private modalItemService: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private cartState:BehaviorSubject<{[id: string]: Boolean}> = new BehaviorSubject<{[id: string]: Boolean}>({});
  constructor() {}
  public getServiceInCart = () => this.cartState.asObservable();
  public updateServiceInCart(serviceId: string | undefined, isInCart: Boolean ):void {
    const currentCartState:{[id: string]: Boolean } = this.cartState.getValue();
    if (serviceId)
      currentCartState[serviceId] = isInCart;    
    this.cartState.next({ ...currentCartState });
  }
  public setItemServiceModal = (boolean: boolean) => this.modalItemService.next(boolean)
  public getItemServiceModal = () => this.modalItemService.asObservable()
  public setCartModal = (boolean: boolean) => this.modalCart.next(boolean)
  public getCartModal = () => this.modalCart.asObservable()
  public setBooleanNav = (boolean: boolean) => this.modalNav.next(boolean);
  public getModalNav = () => this.modalNav.asObservable();
}
