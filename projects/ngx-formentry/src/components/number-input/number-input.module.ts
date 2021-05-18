import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NumberInputComponent } from './number-input.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [NumberInputComponent],
  declarations: [NumberInputComponent],
  providers: []
})
export class NumberInputModule {}
