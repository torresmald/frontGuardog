import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerViewComponent } from './trainer-view.component';
import { AuthGuard } from 'src/app/core/guards/canActivate/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TrainerViewComponent,
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerViewRoutingModule { }
