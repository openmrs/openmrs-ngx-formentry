import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePipe } from './components/file-upload/secure.pipe';
import { DataSources } from './form-entry/data-sources/data-sources';
import { TimeAgoPipe } from 'time-ago-pipe';
@NgModule({
  declarations: [SecurePipe,TimeAgoPipe],
  imports: [CommonModule],
  exports: [SecurePipe,TimeAgoPipe],
  providers: [DataSources]
})
export class SharedModule {}
