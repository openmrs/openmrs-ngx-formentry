import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { FormEntryModule } from './form-entry/form-entry.module';
import { QuestionFactory } from './form-entry/form-factory/question.factory';
import { FormFactory } from './form-entry/form-factory/form.factory';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlCarouselComponent } from './components/owl-carousel';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormEntryModule
  ],
  declarations: [
    AppComponent,
    OwlCarouselComponent
  ],
  providers: [
    QuestionFactory,
    FormFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
