import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared.module';
import { FileUploadComponent } from './file-upload.component';
import { WebcamModule } from 'ngx-webcam';
import { NgxFileUploaderModule } from 'ngx-file-uploader'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    WebcamModule,
    NgxFileUploaderModule
  ],
  exports: [FileUploadComponent],
  declarations: [FileUploadComponent],
  providers: []
})
export class RemoteFileUploadModule {}
