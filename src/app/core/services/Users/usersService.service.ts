import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public getTokenParent() {  
        const authToken = localStorage.getItem('parents');
        return authToken ? JSON.parse(authToken).user.email : null;
      }

      public getTokenTrainer() {  
        const authToken = localStorage.getItem('trainer');
        return authToken ? JSON.parse(authToken).user.email : null;
      }
}