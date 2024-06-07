import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Parents } from '../../models/Parents/transformed/ParentModel';
import { LoadingService } from '../Loading/loading.service';
import { tap } from 'rxjs';
interface DataStripe {
  description: Parents;
  totalAmount: number;
}
const URL_API = {
  DOMAIN: environment.baseUrl,
  TRANSACTIONS: '/transactions/create-transaction',
};
@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  public createTransaction(payment_method_token: any, data: DataStripe) {
    this.loadingService.showLoading();
    const body = {
      payment_method_token,
      data,
    };

    // return this.http.post(`${URL_API.DOMAIN}${URL_API.TRANSACTIONS}`, body)
    return this.http
      .post(`http://localhost:4000/transactions/create-transaction`, body)
      .pipe(
        tap(() => {
          this.loadingService.hideLoading();
        })
      );
  }
}
