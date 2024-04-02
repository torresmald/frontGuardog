import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: [],
})
export class ConfirmAccountComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private parentsService: ParentService,
    private navigationService: NavigationService
  ) {}

  public token: string = '';
  public message: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.token = value['token'];
    });

    this.parentsService
      .verifyParentAccount(this.token)
      .pipe(
        catchError((error) => {
          this.message = error.error.message;
          this.toastService.$message?.next(this.message);
          this.toastService.showToast();
          return of(null);
        })
      )
      .subscribe((value) => {
        if (value) {
          this.message = value;
          this.toastService.$message?.next(this.message);
          this.toastService.showToast();
          setTimeout(() => {
            this.toastService.closeToast();
            this.navigationService.onNavigate('')
          }, 2000);
        }
      });
  }
}
