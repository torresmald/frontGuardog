import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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
            this.modalService.message?.next('EYYYYYY!!!!')
            this.modalService.showModal()
            this.router.navigate(['trainer-view'])
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
            this.modalService.message?.next('Logaudo!!!!')
            this.modalService.showModal()
            this.router.navigate(['parent-view'])
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
