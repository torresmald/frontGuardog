import { Component } from '@angular/core';
import { UsersService } from '../../services/Users/usersService.service';
import { CouponsService } from '../../services/Coupons/coupons.service';
import { Coupon } from '../../models/Coupons/CouponModel';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-coupons',
  templateUrl: './modal-coupons.component.html',
  styles: [],
})
export class ModalCouponsComponent {
  public isLogged?: Observable<boolean>;
  public coupon?: Coupon;
  public changeModal: boolean = false;
 

  constructor(
    private usersService: UsersService,
    private couponsService: CouponsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.isLogged =  this.usersService.userLogged$
    this.couponsService.getDailyCoupon().subscribe(value => this.coupon = value)
    setInterval(() => {
      this.changeModal = !this.changeModal;
    }, 5000);
  }
}
