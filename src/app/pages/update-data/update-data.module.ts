import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateDataRoutingModule } from './update-data-routing.module';
import { UpdateDataComponent } from './update-data.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UpdateDataComponent
  ],
  imports: [
    CommonModule,
    UpdateDataRoutingModule,
    ReactiveFormsModule
  ]
})
export class UpdateDataModule { }
