import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAppointmentsComponent } from './my-appointments.component';
import { AuthGuard } from 'src/app/core/guards/canActivate/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MyAppointmentsComponent,
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAppointmentsRoutingModule { }
