import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { ValidationService } from 'src/app/core/services/Validation/validation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: []
})
export class ForgotPasswordComponent implements OnInit {
  public form!: FormGroup;
  public message?: string;

  constructor(private parentsService: ParentService, private toastService: ToastService, private navigationService: NavigationService, private validationService: ValidationService){}
  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    })

  }

  public isValidField(field: string){
    return this.validationService.isValidField(this.form, field)
  }

  public getFieldError(field:string){
        return this.validationService.getFieldError(this.form, field, 'FORGOT_PASSWORD')
  }

  public onSubmit(){
    if(this.form?.valid){
      this.parentsService.forgotPassword(this.form.value).subscribe((value) => {
        if (value) {
          this.message = value;
          this.toastService.$message?.next(this.message);
          this.toastService.showToast();
          setTimeout(() => {
            this.toastService.closeToast();
            this.navigationService.onNavigate('')
          }, 2000);
        }
      })
    }
  }
}
