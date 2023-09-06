import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { RemoteSelectComponent } from './ngx-remote-select.component';

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule, TranslateModule],
  exports: [RemoteSelectComponent],
  declarations: [RemoteSelectComponent],
  providers: []
})
export class NgxRemoteSelectModule {}
