import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public shouldShowLoading$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.shouldShowLoading$.next(false);
  }

  public showLoading() {
    this.shouldShowLoading$.next(true);
  }

  public hideLoading() {
    this.shouldShowLoading$.next(false);
  }
}
