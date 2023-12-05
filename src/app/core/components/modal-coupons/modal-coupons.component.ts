import { Component } from '@angular/core';
import { ModalService } from '../../services/Modal/modal.service';
import { UsersService } from '../../services/Users/usersService.service';
import { CouponsService } from '../../services/Coupons/coupons.service';
import { Coupon } from '../../models/Coupons/CouponModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-coupons',
  templateUrl: './modal-coupons.component.html',
  styleUrls: ['./modal-coupons.component.scss'],
})
export class ModalCouponsComponent {
  public shouldShowModal?: boolean;
  public message?: string;
  public isLogged: boolean = false;
  public coupon?: Coupon;
  public changeModal: boolean = false;
 

  constructor(
    private modalService: ModalService,
    private usersService: UsersService,
    private couponsService: CouponsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.modalService.$shoulShowModal.subscribe((value) => {
      this.shouldShowModal = value;
    });
    this.message = 'Aqui tienes tu cupón';
    this.usersService.userLogged$.subscribe((value) => {
      this.isLogged = value;
    });
    this.couponsService.getDailyCoupon().subscribe((value) => {
      if (value) {
        this.coupon = value;
      }
    });
    setInterval(() => {
      this.changeModal = !this.changeModal;
    }, 5000);
  }
}
