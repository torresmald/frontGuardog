import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTrainers } from 'src/app/core/models/Trainers/api/apiTrainerModel';
import { ApiUsers } from 'src/app/core/models/Users/api/apiUserModel';
import { environment } from 'src/environments/environment';


const URL_API = {
  DOMAIN: environment.baseUrl,
  TRAINERS: '/trainers',
  LOGIN: '/login'
}


@Injectable({
  providedIn: 'root'
})
export class ApiTrainerService {

  constructor(private htpp: HttpClient) { }

  public getApiTrainers() :Observable<ApiTrainers[]>{
    return this.htpp.get<ApiTrainers[]>(`${URL_API.DOMAIN}${URL_API.TRAINERS}`)
  }

  public getApiTrainer(id: string): Observable<ApiTrainers>{
    return this.htpp.get<ApiTrainers>(`${URL_API.DOMAIN}${URL_API.TRAINERS}/${id}`)
  }
  
  public loginApiTrainers(body: ApiTrainers): Observable<ApiUsers> {
    return this.htpp.post<ApiUsers>(`${URL_API.DOMAIN}${URL_API.TRAINERS}${URL_API.LOGIN}`, body)
  }

  public updateApiDataTrainer(id: string, body: string): Observable<string>{
    return this.htpp.put<string>(`${URL_API.DOMAIN}${URL_API.TRAINERS}/${id}`, body)
  }


}
