import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormEntryComponent } from './form-entry.component';
import { QuestionComponent } from './question.component';
import { FormControlService } from './form-control.service';
import { FormBuilder } from '@angular/forms';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormEntryComponent, QuestionComponent],
  providers: [FormBuilder, FormControlService],
  exports: [FormEntryComponent]
})
export class FormEntryModule { }
