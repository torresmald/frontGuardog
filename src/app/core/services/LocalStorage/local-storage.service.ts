import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Services} from "../../models/Services/transformed/ServiceModel";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public TOKEN_KEY_CART: string = 'cart';
  public TOKEN_KEY_USER: string = 'user';
  public localStorageData: BehaviorSubject<Services[] | null> = new BehaviorSubject<Services[] | null>(null);

  constructor() {
    this.getLocalStorage();
  }

  private updateLocalStorage(){
    const storedValue: string | null = localStorage.getItem(this.TOKEN_KEY_CART);
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;
    this.localStorageData.next(parsedValue);
  }
  public  getLocalStorage():Observable<Services[] | null>  {
    this.updateLocalStorage()
    return this.localStorageData.asObservable();
  }

  public setLocalStorage(requestedServices: Services[]){
    localStorage.setItem(this.TOKEN_KEY_CART, JSON.stringify(requestedServices))
    this.updateLocalStorage()
  }

  public removeLocalStorage(key: string){
    localStorage.removeItem(key)
  }

  public getLocalItem(key:string){
    return localStorage.getItem(key)
  }

  public setLocalStorageKey(key:string, data:string){
    return localStorage.setItem(key, data)
  }

  public removeItem(key:string){
    localStorage.removeItem(key)
  }
}
