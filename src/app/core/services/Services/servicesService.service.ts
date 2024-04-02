import { Injectable } from '@angular/core';
import { ApiServicesService } from './api/ApiServicesService.service';
import {BehaviorSubject, map, tap} from 'rxjs';
import { transformDataService } from './helpers/transformApi';
import { LoadingService } from '../Loading/loading.service';
import {Services} from "../../models/Services/transformed/ServiceModel";

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private selectOneService: BehaviorSubject<Services | null> = new BehaviorSubject<Services | null>(null)
  constructor(
    private apiServicesService: ApiServicesService,
    private loadingService: LoadingService,
  ) {}

  public getServices() {
    this.loadingService.showLoading();
    return this.apiServicesService.getApiServices().pipe(
      map((apiServices) => {
        return apiServices.map((apiService) =>
          transformDataService(apiService)
        );
      }),
      tap(() => {
        this.loadingService.hideLoading();
      })
    );
  }
  public setSelectService = (service: Services) => this.selectOneService.next(service)
  public getSelectService = () => this.selectOneService.asObservable()

  public getService(id: string) {
    this.loadingService.showLoading();
    return this.apiServicesService.getApiService(id).pipe(
      map((apiService) => {
        transformDataService(apiService);
      }),
      tap(() => {
        this.loadingService.hideLoading();
      })
    );
  }

}
