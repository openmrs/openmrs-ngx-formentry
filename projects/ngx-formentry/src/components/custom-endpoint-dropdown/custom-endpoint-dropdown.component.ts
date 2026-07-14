import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'ofe-custom-endpoint-dropdown',
  template: `
    <div>
      <label [attr.for]="question.key"></label>
      <ng-select
        [ngClass]="{
            'afe-custom': theme === 'light'
        }"
        [items]="options$ | async"
        bindLabel="label"
        bindValue="value"
        [multiple]="false"
        >
        </ng-select>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomEndpointDropdownComponent),
      multi: true
    }
  ],
  standalone: false
})
export class CustomEndpointDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() question: any;
  @Input() theme!:string;
  value: any = '';
  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};
  endpointUrl = '';
  valueKey:string = 'uuid';
  labelKey:string = 'display';
  options$!: Observable<any[]>
  
  constructor(private http:HttpClient){

  }

  ngOnInit() {
    this.getControlValues();
    this.setValueObservable();
  }

  getControlValues(){
    this.endpointUrl = this.question.extras.questionOptions.renderingOptions?.endpointUrl ?? '';
    this.valueKey = this.question.extras.questionOptions.renderingOptions?.valueKey ?? 'uuid';
    this.labelKey = this.question.extras.questionOptions.renderingOptions?.labelKey ?? 'display';
  }
  setValueObservable(){
    if(this.endpointUrl && this.valueKey && this.labelKey){
      this.options$ = this.http.get(this.endpointUrl)
      .pipe(
        map((response: any) => {
        const dataArray = response.results || response; 
        if(!dataArray){
            return [];
        }else{
           return dataArray.map((item: any) => ({
            value: item[`${this.valueKey}`],
            label: item[`${this.labelKey}`]
           }));
        }
        }),
        catchError((err) => {
          console.error('Failed to load data', err);
          return of([]);
        })
       );
    }
  
  }

  onDropdownChange(val: any) {
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
  writeValue(value: any): void { this.value = value || ''; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
}