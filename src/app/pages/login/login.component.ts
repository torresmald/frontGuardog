import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeactivatableComponent } from 'src/app/core/guards/canDeactivate/deactivate.interface';
import { LoadingService } from 'src/app/core/services/Loading/loading.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { ValidationService } from 'src/app/core/services/Validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements DeactivatableComponent {
  public form!: FormGroup;
  public errors?: string;
  public isTrainer: boolean = false;
  public isSubmitted: boolean = false;
  public showPassword:boolean = false

  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private trainerService: TrainerService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private usersService: UsersService,
    private loadingService: LoadingService,
    private navigationService: NavigationService,
    private validationService: ValidationService
  ) {}

  

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.validationService.emailPattern)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
    });
    this.route.queryParams.subscribe((value) => {
      if (value['isTrainer']) {
        this.isTrainer = true;
      }
    });
  }

  public isValidField(field: string){
    return this.validationService.isValidField(this.form, field)
  }

  public getFieldError(field:string){
    return this.validationService.getFieldError(this.form, field, 'LOGIN')
  }

  public toogleShowPassword(){
    this.showPassword = !this.showPassword
  }

  public onSubmit() {
    if (this.form?.valid) {
      const request = this.isTrainer 
        ? this.trainerService.loginTrainers(this.form?.value).subscribe({
            next: () => {
              this.modalService.$message?.next('Logueado con éxito');
              this.modalService.showModal('other');
              this.isSubmitted = true;
              this.usersService.userLogged$.next(true);
              setTimeout(() => {
                this.navigationService.onNavigate('trainer-view')
              }, 1000);
            },
            error: (error) => {
              this.loadingService.hideLoading()
              const { error: errorResponse } = error;
              this.errors = errorResponse.message;
            },
          })
        : this.parentService.loginParent(this.form?.value).subscribe({
            next: () => {
              this.modalService.$message?.next('Logueado con éxito');
              this.modalService.showModal('other');
              this.isSubmitted = true;
              this.usersService.userLogged$.next(true);
              setTimeout(() => {
                this.navigationService.onNavigate('parent-view')
              }, 1000);
            },
            error: (error) => {
              this.loadingService.hideLoading()
              const { error: errorResponse } = error;
              this.errors = errorResponse.message;
            },
          });
    }
  }

  canDeactivate() {
    if (!this.form?.dirty) {
      return true;
    } else if (!this.isSubmitted) {
      this.modalService.$message?.next(
        'No has terminado de rellenar el Formulario'
      );
      this.modalService.showModal('other');
    }
    return this.modalService.result$;
  }
}
