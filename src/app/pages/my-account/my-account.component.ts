import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parents } from 'src/app/core/models/Parents/transformed/ParentModel';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  public id: string = '';
  public trainer?: Trainers;
  public parent?: Parents;
  public token?: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainerService: TrainerService,
    private localStorageService: LocalStorageService,
    private parentsService: ParentService
  ) {}

  ngOnInit(): void {
    this.token = this.localStorageService.TOKEN_KEY_USER;
    const storedValue = localStorage.getItem(this.token);
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    
    parsedValue.user.pets 
    ? 
      this.parentsService.getParent(this.id).subscribe((parent) => {
        this.parent = parent;
      })
    :
      this.trainerService.getTrainer(this.id).subscribe((trainer) => {
        this.trainer = trainer;
      });
    
  }

  public onChangeData(id: string) {
    this.router.navigate([`/update-data/${id}`])
    
  }
}
