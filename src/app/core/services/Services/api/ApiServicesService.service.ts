import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiServices } from "src/app/core/models/Services/api/apiServiceModel";

const API_URL = 'https://api-guardog.vercel.app/services'

@Injectable({
    providedIn: 'root'
})
export class ApiServicesService {

    constructor(private http:HttpClient){}

    public getApiServices() : Observable<ApiServices[]>{
        return this.http.get<ApiServices[]>(API_URL)
    }

    public getApiService(id: string) : Observable<ApiServices>{
        return this.http.get<ApiServices>(`${API_URL}/${id}`)
    }
}