import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
const TOKEN_KEY = 'user';


@Injectable({
    providedIn: 'root'
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


    public getTokenParent() {  
        const authToken = localStorage.getItem(TOKEN_KEY);
        return authToken ? JSON.parse(authToken).user.email : null;
      }

      public getTokenTrainer() {  
        const authToken = localStorage.getItem(TOKEN_KEY);
        return authToken ? JSON.parse(authToken).user.email : null;
      }
}