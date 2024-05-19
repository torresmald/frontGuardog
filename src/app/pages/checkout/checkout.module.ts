import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceCardComponent } from './service-card/service-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    ServiceCardComponent,
    CheckoutPaymentComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ]
})
export class CheckoutModule { }
