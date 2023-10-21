import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentViewRoutingModule } from './parent-view-routing.module';
import { ParentViewComponent } from './parent-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyPetsComponent } from './my-pets/my-pets.component';


@NgModule({
  declarations: [
    ParentViewComponent,
    MyPetsComponent,
  ],
  imports: [
    CommonModule,
    ParentViewRoutingModule,
    SharedModule
  ]
})
export class ParentViewModule { }
