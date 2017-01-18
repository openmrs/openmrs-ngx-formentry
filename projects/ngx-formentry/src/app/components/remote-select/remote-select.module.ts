import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SelectModule } from 'ng2-select/ng2-select';

import { RemoteSelectComponent } from './remote-select.component';

@NgModule({
    imports: [BrowserModule, SelectModule],
    exports: [RemoteSelectComponent],
    declarations: [RemoteSelectComponent],
    providers: [],
})
export class RemoteSelectModule { }
