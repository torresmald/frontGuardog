import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isMobile: boolean = false;

  public openMenuMobile(){
    this.isMobile = !this.isMobile    
  }
}





