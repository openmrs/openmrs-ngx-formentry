import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from "@angular/forms";
import { CustomControlQuestion } from "../../form-entry/question-models/custom-control-question.model";

@Component({
  selector: 'app-custom-control-wrapper',
  templateUrl: "custom-control-wrapper.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomControlWrapperComponent)
    }
  ]
})
export class CustomControlWrapperComponent implements ControlValueAccessor, OnInit  {

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
  customControlConfig = { tag: '', url: '', module: '' }
  ngOnInit(): void {
    this.customControlConfig = this.question?.extras?.customControlConfig;
  }

  @Input()
  question: CustomControlQuestion;

  value: any;

  config = {};

  onChange = (value) => { };

  onTouched = () => { };

  touched = false;

  disabled = false;

  onValueChange(event) {
    this.markAsTouched();
    if (!this.disabled) {
      this.value = event?.detail?.data;
      this.onChange(this.value);
    }
  }


  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}