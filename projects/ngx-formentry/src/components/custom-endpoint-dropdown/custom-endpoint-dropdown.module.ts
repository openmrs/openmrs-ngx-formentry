import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { CustomEndpointDropdownComponent } from './custom-endpoint-dropdown.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CustomEndpointDropdownComponent],
  exports: [CustomEndpointDropdownComponent],
  imports: [CommonModule, FormsModule, TranslateModule, NgSelectModule]
})
export class CustomEndpointDropdownModule {}
