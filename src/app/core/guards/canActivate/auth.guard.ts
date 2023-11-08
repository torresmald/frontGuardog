import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from "../../services/Users/usersService.service";

export const AuthGuard: CanActivateFn = (): Observable<boolean> | boolean  => {
  
    const router: Router = inject(Router);
    const user = inject(UsersService)
    if(user.isLogged()){        
        return true
    }
    router.navigate(['/login'])
    return false
  }