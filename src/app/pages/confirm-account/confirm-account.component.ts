import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss'],
})
export class ConfirmAccountComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private parentsService: ParentService,
    private router: Router
  ) {}

  public token: string = '';
  public message?: any;

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
            this.router.navigate(['']);
          }, 2000);
        }
      });
  }
}
