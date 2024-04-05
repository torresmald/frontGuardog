import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPets } from 'src/app/core/models/Pets/api/apiPetModel';
import { environment } from 'src/environments/environment';


const URL_API = {
  DOMAIN: environment.baseUrl,
  PETS: '/pets',
  REGISTER: '/register',
}
@Injectable({
  providedIn: 'root'
})
export class ApiPetsService {

  constructor(private http:HttpClient) { }

  public getApiPets (): Observable<ApiPets[]> {
    return this.http.get<ApiPets[]>(`${URL_API.DOMAIN}${URL_API.PETS}`)
  }

  public getApiPet (id:string): Observable<ApiPets> {
    return this.http.get<ApiPets>(`${URL_API.DOMAIN}${URL_API.PETS}/${id}`)
  }

  public registerApiPets(body: FormData): Observable<ApiPets> {    
    return this.http.post<ApiPets>(`${URL_API.DOMAIN}${URL_API.PETS}${URL_API.REGISTER}`, body)
  } 

  public deleteApiPets(id:string): Observable<string>{
    return this.http.delete<string>(`${URL_API.DOMAIN}${URL_API.PETS}/${id}`)
  }
}
