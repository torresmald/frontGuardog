import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  private modalNav = new BehaviorSubject<boolean>(false);

  constructor() { }

  setBooleanNav(boolean: boolean) 
  {
    this.modalNav.next(boolean);
  }

  getModalNav() {
    return this.modalNav.asObservable()
  }
}
