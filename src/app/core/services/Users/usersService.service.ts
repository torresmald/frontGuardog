import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
const TOKEN_KEY = 'user';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public userLogged$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor() {
    this.userLogged$.next(this.isLogged());
  }

  public isLogged(): boolean {
    const authToken = localStorage.getItem(TOKEN_KEY);
    if (!authToken) {
      return false;
    }
    const isValidToken = JSON.parse(authToken).token;
    return !!isValidToken;
  }

  public getToken() {
    const authToken = localStorage.getItem(TOKEN_KEY);
    return authToken ? JSON.parse(authToken).user._id : null;
  }

  public logout(){
    localStorage.removeItem(TOKEN_KEY)
    this.userLogged$.next(false);
  }


}
