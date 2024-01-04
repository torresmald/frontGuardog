import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourierService } from './core/services/courier/courier.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'Guardog';
  public excludedUrls = ['login', 'register', 'confirm-account', 'forgot-password'];
  public isMenuOpen: boolean = false
  public isCartModal: boolean = false
  public isItemServiceModal: boolean = false
  public isPetModal: boolean = false


  constructor(public router: Router, public courierService: CourierService) {}


  ngOnInit() {
    this.courierService.getModalNav().subscribe((value) => this.isMenuOpen = value);
    this.courierService.getCartModal().subscribe(value => this.isCartModal = value)
    this.courierService.getItemServiceModal().subscribe(value => this.isItemServiceModal = value)
    this.courierService.getPetModal().subscribe((value) => this.isPetModal = value);

  }
  shouldShow(): boolean {
    return this.excludedUrls.every(url => !this.router.url.includes(url));
  }


}
