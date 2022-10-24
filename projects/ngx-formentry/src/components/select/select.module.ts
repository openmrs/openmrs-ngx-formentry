// modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// imports
import { SelectComponent } from './select.component';
import { OptionDirective } from './option.directive';
import { OptGroupDirective } from './optgroup.directive';

@NgModule({
  declarations: [SelectComponent, OptionDirective, OptGroupDirective],
  exports: [SelectComponent, OptionDirective, OptGroupDirective],
  imports: [CommonModule, FormsModule]
})
export class SelectModule {}
