import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './directives/scroll-to-top/scroll-to-top.component';
import { DragDropDirective } from './directives/files/drag-drop.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { SanitizerPipe } from './pipes/sanitizer/sanitizer.pipe';



@NgModule({
  declarations: [ScrollToTopComponent, DragDropDirective, SanitizerPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ScrollToTopComponent, SanitizerPipe]
})
export class SharedModule { }
