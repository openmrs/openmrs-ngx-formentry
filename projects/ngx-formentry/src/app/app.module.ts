import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

import { AppComponent } from './app.component';

import { FormEntryModule } from './form-entry/form-entry.module';
import { DateTimePickerModule } from './components/date-time-picker';
// import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataSources } from './form-entry/data-sources/data-sources';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    FormEntryModule,
    DateTimePickerModule,
    Ng2PageScrollModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    DataSources
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  // hmrOnInit(store) {
  //   console.log('HMR store', store);
  // }
  // hmrOnDestroy(store) {
  //   let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   // recreate elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // remove styles
  //   removeNgStyles();
  // }
  // hmrAfterDestroy(store) {
  //   // display new elements
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }
}
