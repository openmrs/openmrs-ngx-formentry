import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormEntryModule } from '../../form-entry/form-entry.module';
import { SampleFormComponent } from './sample-form.component';

@NgModule({ declarations: [SampleFormComponent],
    bootstrap: [SampleFormComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        FormEntryModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SampleModule {}
