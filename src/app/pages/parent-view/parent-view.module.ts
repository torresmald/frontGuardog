import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentViewRoutingModule } from './parent-view-routing.module';
import { ParentViewComponent } from './parent-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceComponent } from './service/service.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { ChatComponent } from 'src/app/core/components/chat/chat.component';


@NgModule({
  declarations: [
    ParentViewComponent,
    ServiceComponent,
  ],
  imports: [
    CommonModule,
    ParentViewRoutingModule,
    SharedModule,
    TranslateModule,
    CoreModule,
    ChatComponent
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES',
  },]
})
export class ParentViewModule { }
