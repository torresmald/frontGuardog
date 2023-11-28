import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { ToastService } from 'src/app/core/services/Toast/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public form?: FormGroup;
  public message?: any;

  constructor(private route: ActivatedRoute, private parentsService: ParentService, private toastService: ToastService, private router: Router){}
  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    })


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
            this.router.navigate([''])
          }, 2000);
        }
      })
    }
  }
}
