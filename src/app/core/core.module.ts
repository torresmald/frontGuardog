import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './services/Loading/loading.service';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent],
  imports: [CommonModule, CoreRoutingModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent, LoaderComponent],
  providers: [LoadingService],
})
export class CoreModule {}
