import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_API = {
  DOMAIN: environment.baseUrl,
  TRANSACTIONS: '/transactions/create-transaction',
}
@Injectable({
  providedIn: 'root'
})


export class StripeService {

  constructor(private http: HttpClient) { }

  public createTransaction(token: any, amount: number){
    const body = {
      stripeToken: token.id, amount
    }

    // return this.http.post(`${URL_API.DOMAIN}${URL_API.TRANSACTIONS}`, body)    
    return this.http.post(`http://localhost:4000/transactions/create-transaction`, body)    

  }
}
