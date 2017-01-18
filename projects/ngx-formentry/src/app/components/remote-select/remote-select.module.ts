import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng2-select/ng2-select';

import { RemoteSelectComponent } from './remote-select.component';

@NgModule({
    imports: [CommonModule, SelectModule],
    exports: [RemoteSelectComponent],
    declarations: [RemoteSelectComponent],
    providers: [],
})
export class RemoteSelectModule { }
