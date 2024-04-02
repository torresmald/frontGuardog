import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Exercise, Nutrition } from 'src/app/core/models/Pets/petsData';
import { LoadingService } from 'src/app/core/services/Loading/loading.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { PetsService } from 'src/app/core/services/Pets/petsService.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public nutrition:  Nutrition[] = [Nutrition.Solida, Nutrition.Humeda, Nutrition.Latas];
  public exercises: Exercise[] = [Exercise.Poco, Exercise.Medio, Exercise.Mucho];
  public maxNumberGifts: number = 0;
  public min: number = 0;
  public max: number = 10;
  public textRegister: string = 'Usuario';
  public isSamePassword: boolean = false;
  public form?: FormGroup;
  public errors?: string;
  public newPet: boolean = false;
  public image: Blob | string = '';
  public url: string | ArrayBuffer | null =
    'https://i.pinimg.com/originals/45/b3/66/45b3660b7d464ca297f9f6969143ca96.jpg';

  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private petsService: PetsService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private modalService: ModalService,
    private loadingService: LoadingService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      if (value['newPet']) {
        this.newPet = true;
        this.textRegister = 'Mascota';
      }
    });

    // TODO Servicio de Validaciones

    // TODO Meter el MATE DATE INPUT par ala fecha


    this.newPet
      ? (this.form = this.fb.group({
          name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
          ]),
          image: new FormControl(null),
          birthday: new FormControl('', Validators.required),
          nutrition: new FormControl('', Validators.required),
          diseases: new FormArray([]),
          exercise: new FormControl('', Validators.required),
          gifts: new FormControl(0),
          parent: new FormControl(this.usersService.getToken()),
        }))
      : (this.form = this.fb.group({
          name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
          ]),
          email: new FormControl('', [Validators.required, Validators.email]),
          image: new FormControl(null),
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
          ]),
          repeatPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
          ]),
          address: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
        }));

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
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.url = reader.result;
      };
      this.image = file;
    }
  }

  public onAddDisease() {
    const control = new FormControl();
    (<FormArray>this.form?.get('diseases')).push(control);
  }

  public onSubmit() {
    if (this.form?.valid) {
      if (this.newPet) {
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

        this.petsService.registerPets(form).subscribe({
          next: () => {
            this.modalService.$message?.next('Mascota Registrada');
            this.modalService.showModal();
            setTimeout(() => {
              this.navigationService.onNavigate('/parent-view');
            }, 1000);
          },
          error: (error) => {
            this.loadingService.hideLoading();
            const { error: errorResponse } = error;
            this.errors = errorResponse.message;
          },
        });
      } else {
        const form = new FormData();
        form.append('name', this.form?.get('name')?.value);
        form.append('image', this.image);
        form.append('email', this.form?.get('email')?.value);
        form.append('password', this.form?.get('password')?.value);
        form.append('address', this.form?.get('address')?.value);
        form.append('phone', this.form?.get('phone')?.value);

        this.parentService.registerParent(form).subscribe({
          next: () => {
            this.modalService.$message?.next('Usuario Registrado');
            this.modalService.showModal();
            setTimeout(() => {
              this.navigationService.onNavigate('/parent-view');
            }, 1000);
          },
          error: (error) => {
            this.loadingService.hideLoading();
            const { error: errorResponse } = error;
            this.errors = errorResponse.message;
          },
        });
      }
    }
  }
}
