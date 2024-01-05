import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTrainers } from 'src/app/core/models/Trainers/api/apiTrainerModel';
import { ApiUsers } from 'src/app/core/models/Users/api/apiUserModel';

const URL_API = 'http://localhost:4000/trainers'

@Injectable({
  providedIn: 'root'
})
export class ApiTrainerService {

  constructor(private htpp: HttpClient) { }

  public getApiTrainers() :Observable<ApiTrainers[]>{
    return this.htpp.get<ApiTrainers[]>(URL_API)
  }

  public getApiTrainer(id: string): Observable<ApiTrainers>{
    return this.htpp.get<ApiTrainers>(`${URL_API}/${id}`)
  }
  
  public loginApiTrainers(body: ApiTrainers): Observable<ApiUsers> {
    return this.htpp.post<ApiUsers>(`${URL_API}/login`, body)
  }

  public updateApiDataTrainer(id: string, body: string): Observable<string>{
    return this.htpp.put<string>(`${URL_API}/${id}`, body)
  }


}
