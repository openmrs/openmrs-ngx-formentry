import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RadioButtonControlComponent } from './radio.component';

@NgModule({
  declarations: [RadioButtonControlComponent],
  exports: [RadioButtonControlComponent],
  imports: [CommonModule, FormsModule]
})
export class RadioModule {}
