/**
 * date-time-picker.module
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatetimeComponent } from './ngx-datetime-picker.component';
import { OwlDateTimeModule } from '../ngx-pick-datetime/lib/date-time/date-time.module';
import { OwlNativeDateTimeModule } from '../ngx-pick-datetime/lib/date-time/adapter/native-date-time.module';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [NgxDatetimeComponent],
  exports: [
    NgxDatetimeComponent
  ],
  providers: []
})
export class NgxDateTimePickerModule {}
