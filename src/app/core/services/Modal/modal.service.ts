import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public $shoulShowModal : ReplaySubject<boolean> = new ReplaySubject<boolean>()
  constructor() { this.$shoulShowModal.next(false)}

  public showModal(){
    this.$shoulShowModal.next(true)
  }
  public closeModal(){
    this.$shoulShowModal.next(false)
  }
}
