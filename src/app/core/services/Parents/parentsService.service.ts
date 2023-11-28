import { Injectable } from '@angular/core';
import { Parents } from '../../models/Parents/transformed/ParentModel';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { ApiParentsService } from './api/apiParentsService.service';
import { ApiParents } from '../../models/Parents/api/apiParentModel';
import { transformDataParent } from './helpers/transformApi';
import { LoadingService } from '../Loading/loading.service';
import { User } from '../../models/Users/transformed/UserModel';

const TOKEN_KEY = 'user'

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
      map((apiParents: ApiParents[]) => {
        return apiParents.map((parent: ApiParents) =>
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

  public registerParent(body: FormData): Observable<Parents> {
    this.loadingService.showLoading();
    return this.apiParentsService
      .registerApiParent(body).pipe(
        map((parent: ApiParents) => transformDataParent(parent)),
        tap(() => {
          this.loadingService.hideLoading();
        })
       );
  }

  public loginParent(body : ApiParents): Observable<User> {
    this.loadingService.showLoading();
    return this.apiParentsService.loginApiParent(body).pipe(
      map((parent: User) => parent),
      tap((response) => {
        const saveStore = JSON.stringify({
          token: response.token,
          user: response.user
        });
        localStorage.setItem(TOKEN_KEY, saveStore);
        this.loadingService.hideLoading();
      })
    )
  }

  public verifyParentAccount(token: string): Observable<any>{
    return this.apiParentsService.verifyApiParentAccount(token).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  public forgotPassword(body: string) : Observable<string>{
    return this.apiParentsService.forgotApiPassword(body)
  }
  public forgotPasswordToken(token: string): Observable<string>{
    return this.apiParentsService.forgotApiPasswordToken(token).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  public updatePassword(token: string, password: string): Observable<string>{
    return this.apiParentsService.updateApiPassword(token, password)
  }

}
