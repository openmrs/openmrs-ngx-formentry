import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NgxFileUploaderModule } from 'ngx-file-uploader-ampath';
import { SharedModule } from '../../shared.module';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select/select.module';
import { RemoteFileUploadComponent } from './file-upload.component';

@NgModule({
    imports: [CommonModule, SelectModule, FormsModule, NgxFileUploaderModule, SharedModule],
    exports: [RemoteFileUploadComponent],
    declarations: [RemoteFileUploadComponent],
    providers: [],
})
export class RemoteFileUploadModule { }
