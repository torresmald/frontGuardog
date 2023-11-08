import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './services/Loading/loading.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalNavComponent } from './components/modal-nav/modal-nav.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ModalService } from '@coreui/angular';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent, ModalNavComponent, ModalFormComponent],
  imports: [CommonModule, CoreRoutingModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent, LoaderComponent, ModalNavComponent, ModalFormComponent],
  providers: [LoadingService, ModalService],
})
export class CoreModule {}
