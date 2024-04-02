import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LocalStorageService } from '../LocalStorage/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public userLogged$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private localStorageService: LocalStorageService) {
    this.userLogged$.next(this.isLogged());
  }

  public isLogged(): boolean {
    const authToken = this.localStorageService.getLocalItem(this.localStorageService.TOKEN_KEY_USER)
    if (!authToken) {
      return false;
    }
    const isValidToken = JSON.parse(authToken).token;
    return !!isValidToken;
  }

  public getToken() {
    const authToken = this.localStorageService.getLocalItem(this.localStorageService.TOKEN_KEY_USER)
    return authToken ? JSON.parse(authToken).user._id : null;
  }

  public logout(){
    this.localStorageService.removeItem(this.localStorageService.TOKEN_KEY_USER)
    this.userLogged$.next(false);
  }


}
