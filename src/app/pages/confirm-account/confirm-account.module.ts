import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmAccountRoutingModule } from './confirm-account-routing.module';
import { ConfirmAccountComponent } from './confirm-account.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ConfirmAccountComponent
  ],
  imports: [
    CommonModule,
    ConfirmAccountRoutingModule,
    TranslateModule
  ]
})
export class ConfirmAccountModule { }
