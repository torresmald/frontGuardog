import { Component } from '@angular/core';
import { CourierService } from '../../services/courier/courier.service';

@Component({
  selector: 'app-modal-nav',
  templateUrl: './modal-nav.component.html',
  styleUrls: ['./modal-nav.component.scss']
})
export class ModalNavComponent {
  public isLightMode: boolean = true;

  constructor(public courierService: CourierService) {}

  public closeMenuMobile() {
    this.courierService.setBooleanNav(false)
  }

  public changeTheme() {

    this.isLightMode = !this.isLightMode;
    console.log(this.isLightMode);
    
  }

}
