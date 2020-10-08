import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePipe } from './components/file-upload/secure.pipe';
import { DataSources } from './form-entry/data-sources/data-sources';
@NgModule({
  declarations: [SecurePipe],
  imports: [CommonModule],
  exports: [SecurePipe],
  providers: [DataSources]
})
export class SharedModule {}
