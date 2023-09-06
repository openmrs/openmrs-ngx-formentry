/**
 * date-time-picker.module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ModalComponent } from './picker-modal/modal.component';
import { MomentPipe } from './pipes/moment.pipe';
import { DateTimePickerComponent } from './date-time-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule],
  declarations: [
    DatePickerComponent,
    TimePickerComponent,
    ModalComponent,
    MomentPipe,
    DateTimePickerComponent
  ],
  exports: [
    DatePickerComponent,
    TimePickerComponent,
    ModalComponent,
    MomentPipe,
    DateTimePickerComponent
  ],
  providers: []
})
export class DateTimePickerModule {}
