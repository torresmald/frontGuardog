import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiServices } from "src/app/core/models/Services/api/apiServiceModel";
import { environment } from "src/environments/environment";


const URL_API = {
    DOMAIN: environment.baseUrl,
    SERVICES: '/services',
  }

@Injectable({
    providedIn: 'root'
})
export class ApiServicesService {

    constructor(private http:HttpClient){}

    public getApiServices() : Observable<ApiServices[]>{
        return this.http.get<ApiServices[]>(`${URL_API.DOMAIN}${URL_API.SERVICES}`)
    }

    public getApiService(id: string) : Observable<ApiServices>{
        return this.http.get<ApiServices>(`${URL_API.DOMAIN}${URL_API.SERVICES}/${id}`)
    }
}