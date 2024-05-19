import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourierService } from './core/services/Courier/courier.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  public title: string = 'Guardog';
  public excludedUrls = ['login', 'register', 'confirm-account', 'forgot-password'];
  public isMenuOpen?: Observable<boolean>
  public isCartModal?: Observable<boolean>
  public isItemServiceModal?: Observable<string>
  public isFiltersModal?: Observable<boolean>
  public isPetModal?: Observable<boolean>


  constructor(public router: Router, public courierService: CourierService) {}


  ngOnInit() {
    this.isMenuOpen = this.courierService.getModalNav()
    this.isCartModal = this.courierService.getCartModal()
    this.isItemServiceModal =  this.courierService.getItemServiceModal()
    this.isPetModal = this.courierService.getPetModal()
    this.isFiltersModal = this.courierService.getFiltersModal()

  }
  shouldShow(): boolean {
    return this.excludedUrls.every(url => !this.router.url.includes(url));
  }


}
