import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentViewComponent } from './parent-view.component';
import { AuthGuard } from 'src/app/core/guards/canActivate/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ParentViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentViewRoutingModule { }
