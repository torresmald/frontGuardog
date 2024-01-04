import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trainers } from 'src/app/core/models/Trainers/transformed/TrainerModel';
import { TrainerService } from 'src/app/core/services/Trainers/trainersService.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  public id: string = ''
  public trainer?: Trainers
  constructor(private route: ActivatedRoute, private trainerService: TrainerService) {
  }

  ngOnInit(): void {
      this.route.params.subscribe((param) => {
        this.id = param['id']
      })
      this.trainerService.getTrainer(this.id).subscribe((trainer) => {
        this.trainer = trainer        
      })
  }

  public onChangeData(){
    
  }
}
