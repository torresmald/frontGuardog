import { Component, HostListener, OnInit } from '@angular/core';
import { CourierService } from '../../services/courier/courier.service';

@Component({
  selector: 'app-modal-nav',
  templateUrl: './modal-nav.component.html',
  styleUrls: ['./modal-nav.component.scss']
})
export class ModalNavComponent implements OnInit {
  public isLightMode: boolean = true;
  public modalAnimation: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const screenWidth = window.innerWidth;
  
    if (screenWidth >= 769) {
      this.closeMenuMobile()
    }
  }

  constructor(public courierService: CourierService) {}

  ngOnInit(): void {
    this.courierService.getModalNav().subscribe(value =>  this.modalAnimation = value)
  }

  public closeMenuMobile() {
    this.modalAnimation = false
    setTimeout(() => {
      this.courierService.setBooleanNav(false)
    }, 400);
  }

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }
  
  public changeTheme() {

    this.isLightMode = !this.isLightMode;
    console.log(this.isLightMode);
    
  }

}
