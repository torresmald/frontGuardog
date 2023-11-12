import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { DragDropDirective } from './files/drag-drop.directive';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ScrollToTopComponent, DragDropDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ScrollToTopComponent]
})
export class SharedModule { }
