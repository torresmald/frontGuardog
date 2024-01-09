import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateDataComponent } from './update-data.component';
import { AuthGuard } from 'src/app/core/guards/canActivate/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UpdateDataComponent,
    canActivate: [AuthGuard]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateDataRoutingModule { }
