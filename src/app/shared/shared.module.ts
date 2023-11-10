import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { Button } from './button/button.component';
import { DragDropDirective } from './files/drag-drop.directive';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ScrollToTopComponent, Button, DragDropDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ScrollToTopComponent, Button]
})
export class SharedModule { }
