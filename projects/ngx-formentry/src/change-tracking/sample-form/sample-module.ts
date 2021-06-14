import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormEntryModule } from '../../form-entry/form-entry.module';
import { SampleFormComponent } from './sample-form.component';

@NgModule({
  declarations: [SampleFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormEntryModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [SampleFormComponent]
})
export class SampleModule {}
