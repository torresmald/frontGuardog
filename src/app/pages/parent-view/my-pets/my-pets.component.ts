import { Component, Input } from '@angular/core';
import { Pets } from 'src/app/core/models/Pets/transformed/PetModel';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.scss']
})
export class MyPetsComponent {
 @Input() pets?: Pets[]
}
