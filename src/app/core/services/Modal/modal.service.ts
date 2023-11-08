import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public $shoulShowModal : ReplaySubject<boolean> = new ReplaySubject<boolean>()
  public $message?: ReplaySubject<string> = new ReplaySubject<string>()
  public result$: Subject<boolean> = new Subject<boolean>();

  constructor() { this.$shoulShowModal.next(true)}

  public showModal(){
    this.$shoulShowModal.next(true)
    
  }
  public closeModal(){    
    this.$shoulShowModal.next(false)    
  }
}
