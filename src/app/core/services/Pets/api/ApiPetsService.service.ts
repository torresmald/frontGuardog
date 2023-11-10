import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPets } from 'src/app/core/models/Pets/api/apiPetModel';

const URL_API = 'http://localhost:4000/pets'

@Injectable({
  providedIn: 'root'
})
export class ApiPetsService {

  constructor(private http:HttpClient) { }

  public getApiPets (): Observable<ApiPets[]> {
    return this.http.get<ApiPets[]>(URL_API)
  }

  public getApiPet (id:string): Observable<ApiPets> {
    return this.http.get<ApiPets>(`${URL_API}/${id}`)
  }

  public registerApiPets(body: FormData): Observable<ApiPets> {
    console.log(body);
    
    return this.http.post<ApiPets>(`${URL_API}/register`, body)
  } 
}
