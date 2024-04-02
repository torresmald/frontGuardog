import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Parents } from 'src/app/core/models/Parents/transformed/ParentModel';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { ParentService } from 'src/app/core/services/Parents/parentsService.service';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: [],
})
export class MyAccountComponent implements OnInit {
  public id: string = '';
  public trainer: Observable<Trainers> = new Observable<Trainers>;
  public parent?: Observable<Parents>;
  constructor(
    private route: ActivatedRoute,
    private trainerService: TrainerService,
    private localStorageService: LocalStorageService,
    private parentsService: ParentService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    const storedValue = this.localStorageService.getLocalItem(this.localStorageService.TOKEN_KEY_USER)
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    parsedValue.user.pets 
    ? 
    this.parent =  this.parentsService.getParent(this.id)
    :
    this.trainer = this.trainerService.getTrainer(this.id)
  }

  public onChangeData(id: string) {
    this.navigationService.onNavigate('/update-data', id)    
  }
}
