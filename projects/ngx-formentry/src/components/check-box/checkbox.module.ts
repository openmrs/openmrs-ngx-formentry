import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CheckboxControlComponent } from './checkbox.component';

@NgModule({
  declarations: [CheckboxControlComponent],
  exports: [CheckboxControlComponent],
  imports: [CommonModule, FormsModule]
})
export class CheckboxModule {}
