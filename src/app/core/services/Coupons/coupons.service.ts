import { Injectable } from '@angular/core';
import { Coupon} from '../../models/Coupons/CouponModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL_API = 'https://api-guardog.vercel.app/coupons';
@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  
  
  constructor(private http: HttpClient) {}

  
  public getCoupons(): Observable<Coupon[]>{
    return this.http.get<Coupon[]>(URL_API)
  }

  public getDailyCoupon(): Observable<Coupon>{
    return this.http.get<Coupon>(`${URL_API}/daily`)
  }

}
