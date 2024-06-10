import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { AuthGuard } from 'src/app/core/guards/canActivate/auth.guard';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    canActivate: [AuthGuard],
    component: CheckoutPaymentComponent,
  },
  {
    path: 'confirmation',
    canActivate: [AuthGuard],
    component: ConfirmationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
