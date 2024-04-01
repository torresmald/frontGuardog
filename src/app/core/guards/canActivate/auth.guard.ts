import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/Users/usersService.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

export const AuthGuard: CanActivateFn = (): Observable<boolean> | boolean => {
  const navigationService: NavigationService = inject(NavigationService);
  const user = inject(UsersService);
  if (user.isLogged()) {
    return true;
  }
  navigationService.onNavigate('/login')
  return false;
};
