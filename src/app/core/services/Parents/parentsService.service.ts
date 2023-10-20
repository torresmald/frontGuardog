import { Injectable } from '@angular/core';
import { Parents } from '../../models/Parents/transformed/ParentModel';
import { Observable, map, tap } from 'rxjs';
import { ApiParentsService } from './api/apiParentsService.service';
import { ApiParents } from '../../models/Parents/api/apiParentModel';
import { transformDataParent } from './helpers/transformApi';
import { LoadingService } from '../Loading/loading.service';

const TOKEN_KEY = 'parents'

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
      map((parents: ApiParents[]) => {
        return parents.map((parent: ApiParents) =>
          transformDataParent(parent)
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
      map((parents: ApiParents) => {
        return transformDataParent(parents)
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
      tap((response) => {
        console.log(response);
        
        this.loadingService.hideLoading();
        const saveStore = JSON.stringify({
          token: response.token,
          parent: response.existParent
        });
        localStorage.setItem(TOKEN_KEY, saveStore);
      })
    )
  }
  
}
