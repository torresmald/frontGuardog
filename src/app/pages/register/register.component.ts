import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public nutrition = ['Solida', 'Humeda', 'Lata'];
  public exercises = ['30-60min', '60-120min', '+120min'];
  public maxNumberGifts : number = 0;
  public min = 0;
  public max = 10;
  public textRegister :string = 'Usuario'
  public isSamePassword: boolean = false;
  public form?: FormGroup;
  public errors?: string;
  public newPet: boolean = false;
  constructor(private fb: FormBuilder, private parentService:ParentService, private petsService: PetsService ,private router: Router, private route:ActivatedRoute, private usersService: UsersService) {}

  
  ngOnInit(): void {

  

    this.route.queryParams.subscribe((value) => {
      if(value['newPet']){
        this.newPet = true
        this.textRegister = 'Mascota'
      }
    });

    this.newPet ?  

    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      image: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      nutrition: new FormControl('', Validators.required),
      diseases: new FormArray([]),
      exercise: new FormControl('', Validators.required),
      gifts: new FormControl(0),
      parent: new FormControl(this.usersService.getTokenParent())
        })
    
    :
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
        });

    


    
    this.form?.get('password')?.valueChanges.subscribe((passwordValue) => {
      const repeatPasswordValue = this.form?.get('repeatPassword')?.value;
      this.isSamePassword = passwordValue === repeatPasswordValue;
    });

    this.form?.get('repeatPassword')?.valueChanges.subscribe((repeatPasswordValue) => {
      const passwordValue = this.form?.get('password')?.value;
      this.isSamePassword = passwordValue === repeatPasswordValue;
    });

  }

  

  public onSubmit() {
    console.log(this.form?.value);
    
    
    if(this.form?.valid){
      // const parent = this.getToken()      
      if(this.newPet){
        // const parentValue = this.form.get('parent')?.setValue('jonathan')
        // console.log(parentValue);
        
        this.petsService.registerPets(this.form.value).subscribe(
          {
            next: () => {
              this.router.navigate(['/parent-view'])
              console.log(this.form?.value);
  
            },
            error: (error) => {
              const {error:errorResponse} = error
              this.errors = errorResponse.msg;
            }
          }
        )
      } else {
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

  public onAddDisease() {
    const control = new FormControl();
    (<FormArray>this.form?.get('diseases')).push(control)
  }

  get controls() {
    return (this.form?.get('diseases') as FormArray).controls;
  }
 }
