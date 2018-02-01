import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { FileUploaderModule } from 'ngx-file-uploader';
import { SharedModule } from '../../shared.module'
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select';
import { RemoteFileUploadComponent } from './file-upload.component';

@NgModule({
    imports: [CommonModule, SelectModule, FormsModule, FileUploaderModule, SharedModule],
    exports: [RemoteFileUploadComponent],
    declarations: [RemoteFileUploadComponent],
    providers: [],
})
export class RemoteFileUploadModule { }
