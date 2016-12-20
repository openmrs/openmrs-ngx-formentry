import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { FormEntryModule } from './form-entry/form-entry.module';
import { QuestionFactory } from './form-entry/form-factory/question.factory';
import { FormFactory } from './form-entry/form-factory/form.factory';
import { ControlRelationsFactory } from './form-entry/form-factory/control-relations.factory';

// import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSchemaCompiler } from './form-entry/services/form-schema-compiler.service';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormEntryModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    QuestionFactory,
    FormFactory,
    FormSchemaCompiler,
    ControlRelationsFactory
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
