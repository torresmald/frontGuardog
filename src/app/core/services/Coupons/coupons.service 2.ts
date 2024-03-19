import { Injectable } from '@angular/core';
import { coupon } from '../../models/Coupons/coupons';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  public COUPONS: any[] = [
    {
      name: '10DESCUENTO',
      discount: 10,
    },
    {
      name: '20DESCUENTO',
      discount: 20,
    },
    {
      name: '50DESCUENTO',
      discount: 50,
    },
  ];
  constructor() {}

  public applyCoupon(coupon: string) {
    const existCoupon = this.COUPONS.find((coup) => coup.name === coupon);
    if (existCoupon) {
      return existCoupon.discount;
    }
  }
}
