import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService implements OnInit {
  public showCartPreview$: Subject<boolean> = new Subject<boolean>();
  ngOnInit(): void {
    this.showCartPreview$.next(false);
  }
  constructor() {}

  public showCart() {
    this.showCartPreview$.next(true);
  }
}
