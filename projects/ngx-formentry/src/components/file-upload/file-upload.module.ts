import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared.module';
import { FileUploadComponent } from './file-upload.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    WebcamModule,
  ],
  exports: [FileUploadComponent],
  declarations: [FileUploadComponent],
  providers: []
})
export class RemoteFileUploadModule {}
