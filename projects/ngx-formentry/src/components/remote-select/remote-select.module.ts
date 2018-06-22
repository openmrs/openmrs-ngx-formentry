import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select/select.module';
import { RemoteSelectComponent } from './remote-select.component';

@NgModule({
    imports: [CommonModule, SelectModule, FormsModule],
    exports: [RemoteSelectComponent],
    declarations: [RemoteSelectComponent],
    providers: [],
})
export class RemoteSelectModule { }
