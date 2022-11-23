import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormEntryModule } from '@openmrs/ngx-formentry';
import { AppComponent } from './app.component';
import { NgxTranslateModule } from './translate/translate.module';

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormEntryModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxTranslateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
