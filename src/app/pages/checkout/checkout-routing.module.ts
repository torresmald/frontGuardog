import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { AuthGuard } from 'src/app/core/guards/canActivate/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
