import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.scss'],
})
export class MyPetsComponent {
  @Input() pets?: Pets[];

  constructor(private router: Router) {
    
  }
  
  public goToDetail(id: string) {
    this.router.navigate(['pet', id]);
  }
}
