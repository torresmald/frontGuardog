import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAppointmentsRoutingModule } from './my-appointments-routing.module';
import { MyAppointmentsComponent } from './my-appointments.component';


@NgModule({
  declarations: [
    MyAppointmentsComponent
  ],
  imports: [
    CommonModule,
    MyAppointmentsRoutingModule
  ]
})
export class MyAppointmentsModule { }
