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
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastComponent } from './components/toast/toast.component';
import { ModalCartComponent } from './components/modal-cart/modal-cart.component';
import { SharedModule } from '../shared/shared.module';
import { ModalItemsServicesComponent } from './components/modal-items-services/modal-items-services.component';
import {FormsModule} from "@angular/forms";
import { ModalCouponsComponent } from './components/modal-coupons/modal-coupons.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { ModalPetsComponent } from './components/modal-pets/modal-pets.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { MapsComponent } from './components/maps/maps/maps.component';
import { ModalFiltersComponent } from './components/modal-filters/modal-filters.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ModalNavComponent,
    ModalFormComponent,
    ModalExtrasComponent,
    ToastComponent,
    ModalCartComponent,
    ModalItemsServicesComponent,
    ModalCouponsComponent,
    ModalPetsComponent,
    SkeletonComponent,
    ModalFiltersComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
    MapsComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ModalNavComponent,
    ModalFormComponent,
    ModalExtrasComponent,
    ToastComponent,
    ModalCartComponent,
    ModalItemsServicesComponent,
    ModalCouponsComponent,
    ModalPetsComponent,
    SkeletonComponent,
    ModalFiltersComponent
  ],
  providers: [LoadingService, ModalService, {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
],
})
export class CoreModule {}
