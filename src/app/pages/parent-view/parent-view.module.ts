import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentViewRoutingModule } from './parent-view-routing.module';
import { ParentViewComponent } from './parent-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyPetsComponent } from './my-pets/my-pets.component';
import { ServiceComponent } from './service/service.component';


@NgModule({
  declarations: [
    ParentViewComponent,
    MyPetsComponent,
    ServiceComponent,
  ],
  imports: [
    CommonModule,
    ParentViewRoutingModule,
    SharedModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES',
  },]
})
export class ParentViewModule { }
