import { Injectable } from '@angular/core';
import { Coupon} from '../../models/Coupons/CouponModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const URL_API = {
  DOMAIN: environment.baseUrl,
  COUPONS: '/coupons',
  DAILY: '/daily',
}
@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  
  
  constructor(private http: HttpClient) {}

  
  public getCoupons(): Observable<Coupon[]>{
    return this.http.get<Coupon[]>(`${URL_API.DOMAIN}${URL_API.COUPONS}`)
  }

  public getDailyCoupon(): Observable<Coupon>{
    return this.http.get<Coupon>(`${URL_API.DOMAIN}${URL_API.COUPONS}${URL_API.DAILY}`)
  }

}
