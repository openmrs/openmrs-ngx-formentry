// modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// imports
import { LabelComponent } from './label.component';
import { TextInputDirective } from './input.directive';
import { TextAreaDirective } from './text-area.directive';

@NgModule({
  declarations: [LabelComponent, TextInputDirective, TextAreaDirective],
  exports: [LabelComponent, TextInputDirective, TextAreaDirective],
  imports: [CommonModule, FormsModule]
})
export class InputModule {}
