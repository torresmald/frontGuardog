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
import { ModalExtrasComponent } from './components/modal-extras/modal-extras.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent, ModalNavComponent, ModalFormComponent, ModalExtrasComponent, ToastComponent],
  imports: [CommonModule, CoreRoutingModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  exports: [HeaderComponent, FooterComponent, LoaderComponent, ModalNavComponent, ModalFormComponent,ModalExtrasComponent, ToastComponent],
  providers: [LoadingService, ModalService],
})
export class CoreModule {}
