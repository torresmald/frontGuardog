import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public $shoulShowToast : ReplaySubject<boolean> = new ReplaySubject<boolean>()
  public $message?: ReplaySubject<string> = new ReplaySubject<string>()

  constructor() { this.$shoulShowToast.next(false)}

  public showToast(){    
    this.$shoulShowToast.next(true)
    
  }
  public closeToast(){    
    this.$shoulShowToast.next(false)    
  }
}
