import { Injectable } from '@angular/core';
import { ApiTrainerService } from './api/apiTrainersService.service';
import { Observable, map, tap } from 'rxjs';
import { Trainers } from '../../models/Trainers/transformed/TrainerModel';
import { transformDataTrainer } from './helpers/transformApi';
import { LoadingService } from '../Loading/loading.service';
import { ApiTrainers } from '../../models/Trainers/api/apiTrainerModel';

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

  public loginTrainers (body: ApiTrainers) : Observable<Trainers> {
    this.loadingService.showLoading()
    return this.apiTrainerService.loginApiTrainers(body).pipe(
      map((apiTrainer) => {
        return transformDataTrainer(apiTrainer)
      }),
      tap(() => {
        this.loadingService.hideLoading()
      })
    )
  }
}
