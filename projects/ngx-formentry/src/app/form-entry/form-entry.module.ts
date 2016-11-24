import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormEntryComponent } from './form-entry-component/form-entry.component';
import { QuestionComponent } from './question.component';
import { FormControlService } from './form-control.service';
import { ValidationFactory } from './factories/validation.factory';

import { FormBuilder } from '@angular/forms';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormEntryComponent, QuestionComponent, FormRendererComponent, ValidationFactory],
  providers: [FormBuilder, FormControlService],
  exports: [FormEntryComponent, FormRendererComponent]
})
export class FormEntryModule { }
