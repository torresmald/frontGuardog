import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateDataRoutingModule } from './update-data-routing.module';
import { UpdateDataComponent } from './update-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    UpdateDataComponent
  ],
  imports: [
    CommonModule,
    UpdateDataRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class UpdateDataModule { }
