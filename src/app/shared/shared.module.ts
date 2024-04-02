import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './directives/scroll-to-top/scroll-to-top.component';
import { DragDropDirective } from './directives/files/drag-drop.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { SanitizerPipe } from './pipes/sanitizer/sanitizer.pipe';
import { SortPricePipe } from './pipes/sortPrice/sortPrice.pipe';
import { SortTypePipe } from './pipes/sortType/sortType.pipe';



@NgModule({
  declarations: [ScrollToTopComponent, DragDropDirective, SanitizerPipe, SortPricePipe, SortTypePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ScrollToTopComponent, SanitizerPipe, SortPricePipe, SortTypePipe]
})
export class SharedModule { }
