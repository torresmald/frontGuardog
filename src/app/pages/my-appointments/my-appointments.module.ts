import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAppointmentsRoutingModule } from './my-appointments-routing.module';
import { MyAppointmentsComponent } from './my-appointments.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MyAppointmentsComponent
  ],
  imports: [
    CommonModule,
    MyAppointmentsRoutingModule,
    TranslateModule
  ]
})
export class MyAppointmentsModule { }
