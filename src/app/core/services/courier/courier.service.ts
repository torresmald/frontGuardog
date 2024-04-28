import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private modalNav:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private modalCart:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private modalPets:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  
  private modalItemService: BehaviorSubject<string> = new BehaviorSubject<string>('')
  private cartState:BehaviorSubject<{[id: string]: boolean}> = new BehaviorSubject<{[id: string]: boolean}>({});
  constructor() {}
  public getServiceInCart = () => this.cartState.asObservable();
  public updateServiceInCart(serviceId: string | undefined, isInCart: boolean ):void {
    const currentCartState:{[id: string]: boolean } = this.cartState.getValue();
    if (serviceId)
      currentCartState[serviceId] = isInCart;    
    this.cartState.next({ ...currentCartState });
  }
  public setItemServiceModal = (string: string) => this.modalItemService.next(string)
  public getItemServiceModal = () => this.modalItemService.asObservable()
  public setCartModal = (boolean: boolean) => this.modalCart.next(boolean)
  public getCartModal = () => this.modalCart.asObservable()
  public setBooleanNav = (boolean: boolean) => this.modalNav.next(boolean);
  public getModalNav = () => this.modalNav.asObservable();
  public setPetModal = (boolean: boolean) => this.modalPets.next(boolean)
  public getPetModal = () => this.modalPets.asObservable()
}
