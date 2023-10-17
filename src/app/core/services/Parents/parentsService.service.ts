import { Injectable } from '@angular/core';
import { Parents } from '../../models/Parents/transformed/ParentModel';
import { Observable, map, tap } from 'rxjs';
import { ApiParentsService } from './api/apiParentsService.service';
import { ApiParents } from '../../models/Parents/api/apiParentModel';
import { transformDataParent } from './helpers/transformApi';
import { LoadingService } from '../Loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  constructor(
    private apiParentsService: ApiParentsService,
    private loadingService: LoadingService
  ) {}

  public getParents(): Observable<Parents[]> {
    this.loadingService.showLoading();
    return this.apiParentsService.getApiParents().pipe(
      map((students: ApiParents[]) => {
        return students.map((student: ApiParents) =>
          transformDataParent(student)
        );
      }),
      tap(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  public getParent(id: string): Observable<Parents> {
    this.loadingService.showLoading();
    return this.apiParentsService.getApiParent(id).pipe(
      map((students: ApiParents) => {
        return transformDataParent(students)
      }),
      tap(() => {
        this.loadingService.hideLoading();
      })
    );
  }

  public registerParent(body: ApiParents): Observable<Parents> {
    this.loadingService.showLoading()
    return this.apiParentsService
      .registerApiParent(body).pipe(
        map((parent: ApiParents) => transformDataParent(parent)),
        tap(() => {
          this.loadingService.hideLoading()
        }));
  }

  public loginParent(body : ApiParents): Observable<Parents> {
    this.loadingService.showLoading()
    return this.apiParentsService.loginApiParent(body).pipe(
      map((parent: ApiParents) => transformDataParent(parent)),
      tap(() => {
        this.loadingService.hideLoading()
      })
    )
  }
}
