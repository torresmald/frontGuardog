import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public nutrition = ['Solida', 'Humeda', 'Latas'];
  public exercises = ['30-60min', '60-120min', '+120min'];
  public maxNumberGifts : number = 0;
  public min = 0;
  public max = 10;
  public textRegister :string = 'Usuario'
  public isSamePassword: boolean = false;
  public form?: FormGroup;
  public errors?: string;
  public newPet: boolean = false;
  public image: Blob | string = '';



  constructor(private fb: FormBuilder, private parentService:ParentService, private petsService: PetsService ,private router: Router, private route:ActivatedRoute, private usersService: UsersService, private modalService: ModalService) {}

 
  
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
      image: new FormControl(null),
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

  public get controlImage() {
    return this.form?.get('image') as FormControl;
  }
  
  public get controlDisease() {
    return (this.form?.get('diseases') as FormArray).controls;
  }

  public uploadImage(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsArrayBuffer(file);
      this.image = file;
      console.log(this.image);
      
    }
  }

  public onSubmit() {
    if(this.form?.valid){


    const form = new FormData();
    form.append('name', this.form?.get('name')?.value);
    form.append('image', this.image);
    form.append('birthday', this.form?.get('birthday')?.value);
    form.append('nutrition', this.form?.get('nutrition')?.value);
    form.append('date', this.form?.get('date')?.value);
    form.append('areas', this.form?.get('areas')?.value);
    form.append('diseases', this.form?.get('diseases')?.value);
    form.append('exercise', this.form?.get('exercise')?.value);
    form.append('parent', this.form?.get('parent')?.value);

    const formData = this.form.value;
      
      console.log(formData);

        this.petsService.registerPets(form).subscribe(
          {
            next: () => {
              this.modalService.$message?.next('Mascota Registrada');
              this.modalService.showModal();
              setTimeout(() => {                
                this.router.navigate(['/parent-view'])
              }, 1000);
            },
            error: (error) => {
              console.log(error);
              const {error:errorResponse} = error
              this.errors = errorResponse.msg;
            }
          }
        )
       
    }
  }

  public onAddDisease() {
    const control = new FormControl();
    (<FormArray>this.form?.get('diseases')).push(control)
  }

 }
