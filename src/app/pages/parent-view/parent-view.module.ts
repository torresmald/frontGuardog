import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentViewRoutingModule } from './parent-view-routing.module';
import { ParentViewComponent } from './parent-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceComponent } from './service/service.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ParentViewComponent,
    ServiceComponent,
  ],
  imports: [
    CommonModule,
    ParentViewRoutingModule,
    SharedModule,
    FormsModule,
    TranslateModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES',
  },]
})
export class ParentViewModule { }
