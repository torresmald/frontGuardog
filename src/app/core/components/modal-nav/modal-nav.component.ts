import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-nav',
  templateUrl: './modal-nav.component.html',
  styleUrls: ['./modal-nav.component.scss']
})
export class ModalNavComponent {

  public isLightMode: boolean = true;

  public changeTheme() {

    this.isLightMode = !this.isLightMode;
    console.log(this.isLightMode);
    
  }

}
