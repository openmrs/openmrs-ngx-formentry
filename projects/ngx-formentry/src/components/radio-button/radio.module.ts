import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { RadioButtonControlComponent } from './radio.component';

@NgModule({
  declarations: [RadioButtonControlComponent],
  exports: [RadioButtonControlComponent],
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class RadioModule {}
