import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeactivatableComponent } from 'src/app/core/guards/canDeactivate/deactivate.interface';
import { LoadingService } from 'src/app/core/services/Loading/loading.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';
import { UsersService } from 'src/app/core/services/Users/usersService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements DeactivatableComponent {
  public form?: FormGroup;
  public errors?: string;
  public isTrainer: boolean = false;
  public isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private parentService: ParentService,
    private trainerService: TrainerService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private usersService: UsersService,
    private loadingService: LoadingService

  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.route.queryParams.subscribe((value) => {
      if (value['isTrainer']) {
        this.isTrainer = true;
      }
    });
  }

  public onSubmit() {
    if (this.form?.valid) {
      const request = this.isTrainer
        ? this.trainerService.loginTrainers(this.form?.value).subscribe({
            next: () => {
              this.modalService.$message?.next('Logueado con éxito');
              this.modalService.showModal();
              this.isSubmitted = true;
              this.usersService.userLogged$.next(true);
              setTimeout(() => {
                this.router.navigate(['trainer-view']);
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
              this.modalService.showModal();
              this.isSubmitted = true;
              this.usersService.userLogged$.next(true);
              setTimeout(() => {
                this.router.navigate(['parent-view']);
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
      this.modalService.showModal();
    }
    return this.modalService.result$;
  }
}
