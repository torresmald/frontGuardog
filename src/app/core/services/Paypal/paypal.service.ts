import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Parents } from '../../models/Parents/transformed/ParentModel';
import { LoadingService } from '../Loading/loading.service';
import { catchError, of, tap } from 'rxjs';
import { LocalStorageService } from '../LocalStorage/local-storage.service';

const URL_API = {
  DOMAIN: environment.baseUrl,
  TRANSACTIONS: '/transactions/create-transaction',
};
@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService
  ) {}

  public transactionData : any

  public createTransaction(order: any) {
    this.transactionData = order
    this.loadingService.showLoading();

    // return this.http.post(`${URL_API.DOMAIN}${URL_API.TRANSACTIONS}`, body)
    return this.http
      .post(`http://localhost:4000/transactions/create-transaction-paypal`, order)
      .pipe(
        tap(() => {
          this.loadingService.hideLoading();
          this.localStorageService.removeItem('cart')
        }),
          catchError((err, caught) => {
          this.loadingService.hideLoading();
          return of(undefined)}),
      );
  }
}
