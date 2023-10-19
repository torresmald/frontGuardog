import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentViewRoutingModule } from './parent-view-routing.module';
import { ParentViewComponent } from './parent-view.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ParentViewComponent
  ],
  imports: [
    CommonModule,
    ParentViewRoutingModule,
    SharedModule
  ]
})
export class ParentViewModule { }
