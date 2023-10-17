import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public isSamePassword: boolean = false;
  public form?: FormGroup;
  public errors?: string;
  constructor(private fb: FormBuilder, private parentService:ParentService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
        });


    this.form.get('password')?.valueChanges.subscribe((passwordValue) => {
      const repeatPasswordValue = this.form?.get('repeatPassword')?.value;
      this.isSamePassword = passwordValue === repeatPasswordValue;
    });

    this.form.get('repeatPassword')?.valueChanges.subscribe((repeatPasswordValue) => {
      const passwordValue = this.form?.get('password')?.value;
      this.isSamePassword = passwordValue === repeatPasswordValue;
    });

  }

  

  public onSubmit() {
    
    if(this.form?.valid){
      this.parentService.registerParent(this.form?.value).subscribe(
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
