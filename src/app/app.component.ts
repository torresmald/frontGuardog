import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourierService } from './core/services/courier/courier.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Guardog';
  isMenuOpen: boolean = false
  isCartModal: boolean = false

  constructor(public _router: Router, public courierService: CourierService) {}

  ngOnInit() {
    this.courierService.getModalNav().subscribe((value) => {
      this.isMenuOpen = value;
    });
    this.courierService.getCartModal().subscribe((value) => {
      this.isCartModal = value 
    })
  }

}
