import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: [],
})
export class UpdatePasswordComponent implements OnInit {
  public token: string = '';
  public message: string = '';
  public form?: FormGroup;
  public isSamePassword: boolean = false;

  constructor(
    private parentsService: ParentService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private modalService: ModalService,
    private navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.token = value['token'];
    });
    this.parentsService
      .forgotPasswordToken(this.token)
      .pipe(
        catchError((error) => {
          this.message = error.error.message;
          this.toastService.$message?.next(this.message);
          this.toastService.showToast();
          setTimeout(() => {
            this.toastService.closeToast();
            this.navigationService.onNavigate('');
          }, 1500);
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
          }, 2000);
        }
      });

    // TODO Servicio validaciones

    this.form = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.form?.get('password')?.valueChanges.subscribe((passwordValue) => {
      const repeatPasswordValue = this.form?.get('repeatPassword')?.value;
      this.isSamePassword = passwordValue === repeatPasswordValue;
    });

    this.form
      ?.get('repeatPassword')
      ?.valueChanges.subscribe((repeatPasswordValue) => {
        const passwordValue = this.form?.get('password')?.value;
        this.isSamePassword = passwordValue === repeatPasswordValue;
      });
  }
  public onSubmit() {
    if (this.form?.valid) {
      const newPassword = this.form?.get('password')?.value;
      this.parentsService
        .updatePassword(this.token, newPassword)
        .subscribe((value) => {
          if (value) {
            this.modalService.$message?.next(value);
            this.modalService.showModal();
            setTimeout(() => {
              this.modalService.closeModal();
              this.navigationService.onNavigate('/login');
            }, 2000);
          }
        });
    }
  }
}
