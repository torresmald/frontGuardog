import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceCardComponent } from './service-card/service-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { ModalStripeComponent } from 'src/app/core/components/modal-stripe/modal-stripe.component';
import { CoreModule } from 'src/app/core/core.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    ServiceCardComponent,
    CheckoutPaymentComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    CoreModule
  ]
})
export class CheckoutModule { }
