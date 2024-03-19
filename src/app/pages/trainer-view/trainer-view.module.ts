import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerViewRoutingModule } from './trainer-view-routing.module';
import { TrainerViewComponent } from './trainer-view.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    TrainerViewComponent
  ],
  imports: [
    CommonModule,
    TrainerViewRoutingModule,
    TranslateModule
  ]
})
export class TrainerViewModule { }
