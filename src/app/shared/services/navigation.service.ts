import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  public id?: string;
  public isParent: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  public onNavigateAccount() {
    const storedValue: string | null = this.localStorageService.getLocalItem(
      this.localStorageService.TOKEN_KEY_USER
    );
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;
    this.id = parsedValue.user._id;
    this.router.navigate([`/my-account/${this.id}`]);
  }

  public onNavigateServices() {
    const storedValue: string | null = this.localStorageService.getLocalItem(
      this.localStorageService.TOKEN_KEY_USER
    );
    if (storedValue) {
      JSON.parse(storedValue).user.pets
        ? (this.isParent = true)
        : (this.isParent = false);
    }
    this.isParent
      ? this.router.navigate(['/parent-view'])
      : this.router.navigate(['/trainer-view']);
  }
}
