import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerViewRoutingModule } from './trainer-view-routing.module';
import { TrainerViewComponent } from './trainer-view.component';


@NgModule({
  declarations: [
    TrainerViewComponent
  ],
  imports: [
    CommonModule,
    TrainerViewRoutingModule
  ]
})
export class TrainerViewModule { }
