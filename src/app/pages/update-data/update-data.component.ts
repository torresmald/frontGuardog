import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Parents } from 'src/app/core/models/Parents/transformed/ParentModel';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { ModalService } from 'src/app/core/services/Modal/modal.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { ValidationService } from 'src/app/core/services/Validation/validation.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: [],
})
export class UpdateDataComponent implements OnInit {
  public id: string = '';
  public token?: string;
  public trainer?: Trainers;
  public parent?: Parents;
  public form!: FormGroup;
  public url: string | ArrayBuffer | null =
    'https://i.pinimg.com/originals/45/b3/66/45b3660b7d464ca297f9f6969143ca96.jpg';

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private trainerService: TrainerService,
    private parentsService: ParentService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private navigationService: NavigationService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    const storedValue = this.localStorageService.getLocalItem(
      this.localStorageService.TOKEN_KEY_USER
    );
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;


    parsedValue.user.pets
      ? this.parentsService.getParent(this.id).subscribe((parent) => {
          this.parent = parent;
          this.form = this.fb.group({
            name: new FormControl(this.parent.name || '', [
              Validators.required,
              Validators.minLength(3),
            ]),
            phone: new FormControl(this.parent.phone || '', [
              Validators.required,
            ]),
            address: new FormControl(
              this.parent.address || '',
              Validators.required
            ),
          });
        })
      : this.trainerService.getTrainer(this.id).subscribe((trainer) => {
          this.trainer = trainer;
          this.form = this.fb.group({
            name: new FormControl(this.trainer.name || '', [
              Validators.required,
              Validators.minLength(3),
            ]),
            phone: new FormControl(this.trainer.phone || '', [
              Validators.required,
            ]),
          });
        });
  }

  public isValidField(field: string){
    return this.validationService.isValidField(this.form, field)
  }

  public getFieldError(field:string){
    return this.validationService.getFieldError(this.form, field, 'UPDATE_DATA')
  }


  public onSubmit() {
    if (this.form?.valid) {
      this.parent
        ? this.parentsService
            .updateDataParent(this.id, this.form.value)
            .subscribe((value) => {
              this.modalService.$message?.next(value);
              this.modalService.showModal();
              setTimeout(() => {
                this.navigationService.onNavigate('/my-account/', this.id);
              }, 1000);
            })
        : this.trainerService
            .updateDataTrainer(this.id, this.form.value)
            .subscribe((value) => {
              this.modalService.$message?.next(value);
              this.modalService.showModal();
              setTimeout(() => {
                this.navigationService.onNavigate('/my-account/', this.id);
              }, 1000);
            });
    }
  }
}
