import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule, TranslateModule],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
