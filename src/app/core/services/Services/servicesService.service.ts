import { Injectable } from "@angular/core";
import { ApiServicesService } from "./api/ApiServicesService.service";
import { map, tap } from "rxjs";
import { transformDataService } from "./helpers/transformApi";
import { LoadingService } from "../Loading/loading.service";

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    constructor(private apiServicesService: ApiServicesService, private loadingService: LoadingService){}

    public getServices (){
        this.loadingService.showLoading()
        return this.apiServicesService.getApiServices().pipe(
            map((apiServices) => {
                return apiServices.map((apiService) => transformDataService(apiService))
            }),
            tap(() => {
                this.loadingService.hideLoading()
            })
        )
    }

    public getService (id: string){
        this.loadingService.showLoading()
        return this.apiServicesService.getApiService(id).pipe(
            map((apiService) => {
               transformDataService(apiService)
            }),
            tap(() => {
                this.loadingService.hideLoading()
            })
        )
    }
}