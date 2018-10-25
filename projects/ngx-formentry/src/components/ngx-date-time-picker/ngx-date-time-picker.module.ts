/**
 * date-time-picker.module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule , MatInputModule } from '@angular/material';
import { NgxDateTimePickerComponent } from './ngx-date-time-picker.component';
// import { AmazingTimePickerModule } from 'amazing-time-picker';
import { MatSelectModule } from '@angular/material/select';
import { DateTimePickerModule } from '../date-time-picker/date-time-picker.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        DateTimePickerModule,
        // AmazingTimePickerModule,
        MatSelectModule
    ],
    declarations: [
        NgxDateTimePickerComponent
    ],
    exports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        NgxDateTimePickerComponent
    ],
    providers: [
    ]
})
export class NgxDateTimePickerModule {
}
