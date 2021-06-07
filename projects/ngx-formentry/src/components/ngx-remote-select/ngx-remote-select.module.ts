import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
// import { SelectModule } from 'ng2-select/ng2-select';
// import { SelectModule } from '../../components/select/select.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RemoteSelectComponent } from './ngx-remote-select.component';

@NgModule({
  imports: [CommonModule,
    //SelectModule, 
    NgSelectModule,
    FormsModule],
  exports: [RemoteSelectComponent],
  declarations: [RemoteSelectComponent],
  providers: []
})
export class NgxRemoteSelectModule { }
