import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NgxFileUploaderModule } from 'ngx-file-uploader';

import { SharedModule } from '../../shared.module';
// import { SelectModule } from 'ng2-select/ng2-select';
import { SelectModule } from '../../components/select/select.module';
import { FileUploadComponent } from './file-upload.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
    imports: [CommonModule, SelectModule, FormsModule, SharedModule, WebcamModule, NgxFileUploaderModule],
    exports: [FileUploadComponent],
    declarations: [FileUploadComponent],
    providers: [],
})
export class RemoteFileUploadModule { }
