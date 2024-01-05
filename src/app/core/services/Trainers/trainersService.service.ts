import { Injectable } from '@angular/core';
import { ApiTrainerService } from './api/apiTrainersService.service';
import { Observable, map, tap } from 'rxjs';
import { Trainers } from '../../models/Trainers/transformed/TrainerModel';
import { transformDataTrainer } from './helpers/transformApi';
import { LoadingService } from '../Loading/loading.service';
import { ApiTrainers } from '../../models/Trainers/api/apiTrainerModel';
import { User } from '../../models/Users/transformed/UserModel';

const TOKEN_KEY = 'user'
@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private apiTrainerService: ApiTrainerService, private loadingService:LoadingService ) { }


  public getTrainers (): Observable<Trainers[]> {
    this.loadingService.showLoading()
    return this.apiTrainerService.getApiTrainers().pipe(
      map((apiTrainer) => {
        return apiTrainer.map((trainer) => {
          return transformDataTrainer(trainer)
        })
      }),
      tap(() => {
        this.loadingService.hideLoading()
      })
    )
  }

  public getTrainer (id: string): Observable<Trainers>{
    this.loadingService.showLoading()
    return this.apiTrainerService.getApiTrainer(id).pipe(
      map((apiTrainer) => {
        return transformDataTrainer(apiTrainer)
      }),
      tap(() => {
        this.loadingService.hideLoading()
      })
    )
  }

  public loginTrainers(body : ApiTrainers): Observable<User> {
    this.loadingService.showLoading()
    return this.apiTrainerService.loginApiTrainers(body).pipe(
      map((parent: User) => parent),
      tap((response) => {
        this.loadingService.hideLoading()
        const saveStore = JSON.stringify({
          token: response.token,
          user: response.user
        });
        localStorage.setItem(TOKEN_KEY, saveStore);
      })
    )
  }

  public updateDataTrainer(id: string, body: string): Observable<string>{
    this.loadingService.showLoading();
    return this.apiTrainerService.updateApiDataTrainer(id, body).pipe(
      tap(() => {
        this.loadingService.hideLoading()
      })
    )
  }
}
