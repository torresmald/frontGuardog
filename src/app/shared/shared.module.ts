import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './directives/scroll-to-top/scroll-to-top.component';
import { DragDropDirective } from './directives/files/drag-drop.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/clickOutsideDiv/click-outside.directive';



@NgModule({
  declarations: [ScrollToTopComponent, DragDropDirective, ClickOutsideDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ScrollToTopComponent, ClickOutsideDirective]
})
export class SharedModule { }
