import { Injectable } from '@angular/core';
import { Coupon} from '../../models/Coupons/CouponModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL_API = 'http://localhost:4000/coupons';
@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  
  public coupon?:Coupon;
  
  constructor(private http: HttpClient) {}

  
  public getCoupons(): Observable<Coupon[]>{
    return this.http.get<Coupon[]>(URL_API)
  }

  public getDailyCoupon(): Observable<Coupon>{
    return this.http.get<Coupon>(`${URL_API}/daily`)
  }

  // public applyCoupon(coupon: string) {
  //   const existCoupon = this.getDailyCoupon().subscribe((value) => {
  //     console.log(value);
  //     console.log(coupon);
      
      
  //     this.coupon = value
  //   })
  //   console.log(existCoupon);
  //   return this.coupon;
  // }

}
