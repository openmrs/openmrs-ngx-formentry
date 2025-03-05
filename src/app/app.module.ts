import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormEntryModule } from '@openmrs/ngx-formentry';
import { AppComponent } from './app.component';
import { SubformDemoComponent } from './subform-demo.component';
import { NgxTranslateModule } from './translate/translate.module';
import { AppointmentSummaryService } from './appointment.service';

@NgModule({
  declarations: [AppComponent, SubformDemoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormEntryModule,
    ReactiveFormsModule,
    NgxTranslateModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    AppointmentSummaryService
  ]
})
export class AppModule {}
