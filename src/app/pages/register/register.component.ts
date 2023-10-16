import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { LoadingService } from 'src/app/core/services/Loading/loading.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public isSamePassword: boolean = false;
  public form?: FormGroup;
  constructor(private fb: FormBuilder, private authService:AuthService, private router: Router, private loadingService:LoadingService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
      console.log(this.form?.value);      
      // this.authService.registerUser(this.form?.value).subscribe((value) => {
      //   console.log(value);
          this.router.navigate(['/home'])
          this.loadingService.showLoading()
      // })
    }
  }
}
