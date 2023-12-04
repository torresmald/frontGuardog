import { Injectable } from '@angular/core';
import { coupon } from '../../models/Coupons/coupons';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  public COUPONS: any[] = [
    { name: '10DESCUENTO', discount: 10 },
    { name: '20DESCUENTO', discount: 20 },
    { name: '30DESCUENTO', discount: 30 },
    { name: '40DESCUENTO', discount: 40 },
    { name: '50DESCUENTO', discount: 50 },
    { name: '60DESCUENTO', discount: 60 },
    { name: '70DESCUENTO', discount: 70 },
    { name: '80DESCUENTO', discount: 80 },
    { name: '90DESCUENTO', discount: 90 },
    { name: '100DESCUENTO', discount: 100 },
  ];
  
  constructor() {}

  public applyCoupon(coupon: string) {
    const existCoupon = this.COUPONS.find((coup) => coup.name === coupon);
    if (existCoupon) {
      console.log(coupon);
      return existCoupon.discount;
    }
  }

  public getRandomCoupon (){
    const randomComparator = () => Math.random() - 0.5;
    return [...this.COUPONS].sort(randomComparator)[0]
  }
}
