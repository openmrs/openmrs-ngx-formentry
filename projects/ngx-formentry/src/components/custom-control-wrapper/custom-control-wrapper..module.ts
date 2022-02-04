import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CustomControlWrapperComponent } from './custom-control-wrapper.component';
import { LazyElementsModule } from '@angular-extensions/elements';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    LazyElementsModule
  ],
  exports: [CustomControlWrapperComponent],
  declarations: [CustomControlWrapperComponent],
  providers: []
})
export class CustomControlWrapperModule {}
