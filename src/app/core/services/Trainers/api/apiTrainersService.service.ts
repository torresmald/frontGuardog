import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTrainers } from 'src/app/core/models/Trainers/api/apiTrainerModel';

const URL_API = 'http://localhost:4000/trainers'

@Injectable({
  providedIn: 'root'
})
export class ApiTrainerService {

  constructor(private htpp: HttpClient) { }

  public getApiTrainers() :Observable<ApiTrainers[]>{
    return this.htpp.get<ApiTrainers[]>(URL_API)
  }

  public loginApiTrainers(body: ApiTrainers): Observable<ApiTrainers> {
    return this.htpp.post<ApiTrainers>(`${URL_API}/login`, body)
  }


}
