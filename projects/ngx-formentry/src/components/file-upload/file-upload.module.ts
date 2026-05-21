import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared.module';
import { FileUploadComponent } from './file-upload.component';
import { WebcamModule } from 'ngx-webcam';
import { NgxFileUploaderComponent } from '@openmrs/ngx-file-uploader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    WebcamModule,
    NgxFileUploaderComponent
  ],
  exports: [FileUploadComponent],
  declarations: [FileUploadComponent],
  providers: []
})
export class RemoteFileUploadModule {}
