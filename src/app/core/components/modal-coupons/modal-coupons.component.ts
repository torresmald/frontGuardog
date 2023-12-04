import { Component } from '@angular/core';
import { ModalService } from '../../services/Modal/modal.service';
import { UsersService } from '../../services/Users/usersService.service';
import { CouponsService } from '../../services/Coupons/coupons.service';

@Component({
  selector: 'app-modal-coupons',
  templateUrl: './modal-coupons.component.html',
  styleUrls: ['./modal-coupons.component.scss']
})
export class ModalCouponsComponent {
  public shouldShowModal?: boolean;
  public message?: string;
  public isLogged: boolean = false;
  public coupon? : any

  constructor(private modalService: ModalService, private usersService:UsersService, private couponsService: CouponsService) {}

  ngOnInit(): void {
    this.modalService.$shoulShowModal.subscribe((value) => {      
      this.shouldShowModal = value;      
    });
    this.message = 'Aqui tienes tu cupón'
    this.usersService.userLogged$.subscribe((value) => {
      this.isLogged = value
    })
    this.coupon = this.couponsService.getRandomCoupon()
    console.log(this.coupon);
    
  }
}
