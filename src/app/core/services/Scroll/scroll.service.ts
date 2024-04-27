import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  public isShow?: boolean;
  public topPosToStartShowing = 100;

  constructor() { }

  @HostListener('window:scroll')
  public checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return this.isShow = scrollPosition >= this.topPosToStartShowing;
  }
}
