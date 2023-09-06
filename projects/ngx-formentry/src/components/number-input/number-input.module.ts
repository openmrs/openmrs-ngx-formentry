import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NumberInputComponent } from './number-input.component';
import { NumberInputDirective } from './number.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [NumberInputComponent],
  declarations: [NumberInputComponent, NumberInputDirective],
  providers: []
})
export class NumberInputModule {}
