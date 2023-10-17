import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { Button } from './button/button.component';



@NgModule({
  declarations: [ScrollToTopComponent, Button],
  imports: [
    CommonModule
  ],
  exports: [ScrollToTopComponent, Button]
})
export class SharedModule { }
