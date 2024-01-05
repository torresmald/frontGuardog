import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parents } from 'src/app/core/models/Parents/transformed/ParentModel';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss'],
})
export class UpdateDataComponent implements OnInit {
  public id: string = '';
  public token?: string;
  public trainer?: Trainers;
  public parent?: Parents;
  public form?: FormGroup;
  public url :string | ArrayBuffer | null = 'https://i.pinimg.com/originals/45/b3/66/45b3660b7d464ca297f9f6969143ca96.jpg'

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private trainerService: TrainerService,
    private parentsService: ParentService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    this.token = this.localStorageService.TOKEN_KEY_USER;
    const storedValue = localStorage.getItem(this.token);
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;

    parsedValue.user.pets
      ? this.parentsService.getParent(this.id).subscribe((parent) => {
          this.parent = parent;
          this.form = this.fb.group( {
            name: new FormControl(this.parent.name || '', [Validators.required, Validators.minLength(3)]),
            phone: new FormControl(this.parent.phone || '', [Validators.required]),
            address: new FormControl(this.parent.address || '', Validators.required),
          })
        })
      : this.trainerService.getTrainer(this.id).subscribe((trainer) => {
        this.trainer = trainer;        
        this.form = this.fb.group( {
          name: new FormControl(this.trainer.name || '', [Validators.required, Validators.minLength(3)]),
          phone: new FormControl(this.trainer.phone || '', [Validators.required]),
        })
        
        });



  }

  public onSubmit(){

    console.log(this.form?.value);
    if(this.form?.valid){
      this.parent 
        ?
        this.parentsService.updateDataParent(this.id, this.form.value).subscribe((value) => {
          this.modalService.$message?.next(value);
          this.modalService.showModal();
          setTimeout(() => {                
            this.router.navigate([`/my-account/${this.id}`])
          }, 1000);          
        })
        :
        this.trainerService.updateDataTrainer(this.id, this.form.value).subscribe((value) => {
          this.modalService.$message?.next(value);
          this.modalService.showModal();
          setTimeout(() => {                
            this.router.navigate([`/my-account/${this.id}`])
          }, 1000);  
        })
        

      }
    
  }
}
