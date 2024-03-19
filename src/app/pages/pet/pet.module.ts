import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetRoutingModule } from './pet-routing.module';
import { PetComponent } from './pet.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PetComponent
  ],
  imports: [
    CommonModule,
    PetRoutingModule,
    TranslateModule
  ]
})
export class PetModule { }
