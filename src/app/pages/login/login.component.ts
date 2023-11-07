import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeactivatableComponent } from 'src/app/core/guards/canDeactivate/deactivate.interface';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements DeactivatableComponent {
  public form?: FormGroup;
  public errors? : string;
  public isTrainer: boolean = false;


  constructor(private fb: FormBuilder, private parentService:ParentService, private trainerService:TrainerService , private router: Router, private route:ActivatedRoute, private modalService: ModalService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        });
      this.route.queryParams.subscribe((value) => {
        if(value['isTrainer']){
          this.isTrainer = true
        }        
      })
  }

  public onSubmit() {    
    if(this.form?.valid){
      const request = this.isTrainer ?
      this.trainerService.loginTrainers(this.form?.value).subscribe(
        {
          next: () => {
            this.modalService.$message?.next('Logueado con éxito')
            this.modalService.showModal()
            setTimeout(() => {
              this.router.navigate(['trainer-view'])
            }, 1000);
          },
          error: (error) => {
            const {error:errorResponse} = error
            this.errors = errorResponse.msg;
          }
        }
      ) 
      : 
      this.parentService.loginParent(this.form?.value).subscribe(
        {
          next: () => {
            this.modalService.$message?.next('Logueado con éxito')
            this.modalService.showModal()
            setTimeout(() => {
              this.router.navigate(['parent-view'])
            }, 1000);
          },
          error: (error) => {
            const {error:errorResponse} = error
            this.errors = errorResponse.msg;
          }
        }
      
      ) 
    }
  }

  canDeactivate () {
    if(!this.form?.dirty){
      return true
    } else {
      this.modalService.$message?.next('No has guardado cambios')
      this.modalService.showModal()
      return false
    }
  }

  
}
