// modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// imports
import { SelectComponent } from './select.component';
import { OptionDirective } from './option.directive';
import { OptGroupDirective } from './optgroup.directive';

@NgModule({
  declarations: [SelectComponent, OptionDirective, OptGroupDirective],
  exports: [SelectComponent, OptionDirective, OptGroupDirective],
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class SelectModule {}
