import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerViewRoutingModule } from './trainer-view-routing.module';
import { TrainerViewComponent } from './trainer-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from 'src/app/core/components/chat/chat.component';


@NgModule({
  declarations: [
    TrainerViewComponent
  ],
  imports: [
    CommonModule,
    TrainerViewRoutingModule,
    TranslateModule,
    FormsModule,
    ChatComponent
  ]
})
export class TrainerViewModule { }
