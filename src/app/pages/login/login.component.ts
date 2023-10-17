import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form?: FormGroup;
  public errors? : string;


  constructor(private fb: FormBuilder, private parentService:ParentService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        });
  }

  

  public onSubmit() {
    
    if(this.form?.valid){
      this.parentService.loginParent(this.form?.value).subscribe(
        {
          next: () => {
            console.log(this.form?.value);
          },
          error: (error) => {
            const {error:errorResponse} = error
            this.errors = errorResponse.msg;
          }
        }
      
      )
    }
  }

}
