import { Component, HostListener } from '@angular/core';
import { ScrollService } from 'src/app/core/services/Scroll/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent {

  constructor(private scrollService: ScrollService){}

  get isShow(){
    return this.scrollService.checkScroll()
  }

  public gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
