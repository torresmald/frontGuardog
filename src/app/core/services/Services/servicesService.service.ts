import { Injectable } from '@angular/core';
import { ApiServicesService } from './api/ApiServicesService.service';
import { Subject, map, tap } from 'rxjs';
import { transformDataService } from './helpers/transformApi';
import { LoadingService } from '../Loading/loading.service';
import { UpdatedStylesData } from './helpers/typeStylesChange';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(
    private apiServicesService: ApiServicesService,
    private loadingService: LoadingService
  ) {}
  public stylesImage: Subject<UpdatedStylesData> = new Subject<UpdatedStylesData>();

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

  public updateStylesImage(data: UpdatedStylesData) {
    this.stylesImage.next(data);
  }
}
