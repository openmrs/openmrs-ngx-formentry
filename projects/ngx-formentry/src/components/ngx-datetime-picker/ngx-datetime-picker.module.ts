/**
 * date-time-picker.module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatetimeComponent } from './ngx-datetime-picker.component';
import { OwlDateTimeModule } from '../ngx-pick-datetime/lib/date-time/date-time.module';
import { OwlNativeDateTimeModule } from '../ngx-pick-datetime/lib/date-time/adapter/native-date-time.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TranslateModule
  ],
  declarations: [NgxDatetimeComponent],
  exports: [NgxDatetimeComponent],
  providers: []
})
export class NgxDateTimePickerModule {}
