import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { CheckboxControlComponent } from './checkbox.component';

@NgModule({
  declarations: [CheckboxControlComponent],
  exports: [CheckboxControlComponent],
  imports: [CommonModule, FormsModule,TranslateModule]
})
export class CheckboxModule {}
