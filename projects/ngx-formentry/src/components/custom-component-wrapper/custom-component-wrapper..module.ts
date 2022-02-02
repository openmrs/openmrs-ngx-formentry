import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomComponentWrapperComponent } from './custom-component-wrapper.component';
import { LazyElementsModule } from '@angular-extensions/elements';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    LazyElementsModule
  ],
  exports: [CustomComponentWrapperComponent],
  declarations: [CustomComponentWrapperComponent],
  providers: []
})
export class CustomComponentWrapperModule {}
