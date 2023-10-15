import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form?: FormGroup;
  constructor(private fb: FormBuilder, private authService:AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      repeatPassword: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl('')
        });
  }
  public onSubmit() {
    this.authService.registerUser(this.form?.value).subscribe((value) => {
      console.log(value);
      
    })
    console.log(this.form?.value);
  }
}
