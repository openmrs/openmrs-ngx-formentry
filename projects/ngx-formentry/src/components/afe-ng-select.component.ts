import {
  Component, Input, forwardRef, OnInit, OnChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Option } from '../form-entry/question-models/select-option';

import { DataSource } from '../form-entry/question-models/interfaces/data-source';


@Component({
  selector: 'afe-ng-select',
  template: `<ng-select
                   (searchInputText)="getChangingText($event)"
                    (ngModelChange)="onValueChange($event)"
                    [options]="question_options"
                    [multiple]="multiple" >
            </ng-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AfeNgSelectComponent),
      multi: true
    }]
})
export class AfeNgSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  subject: BehaviorSubject<Option[]>;
  subjectOption: BehaviorSubject<Option>;
  @Input() dataSource: DataSource;
  @Input() multiple: boolean;
  @Input() extras: any;
  question_options: any = [];
  selected_question_option: any;
  errors: any = [];
  propagateChange = (_: any) => { };

  getChangingText(event) {
    // console.log(event);
    this.getData(event).subscribe((options) => {
      this.question_options = options;
    });
  }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }

  registerOnTouched(fn: any): void { }

  ngOnChanges(changes: any) { }

  ngOnInit() {
    if (this.extras) {
      if (this.extras.originalValue) {
        this.resolveSelectedOption(this.extras.originalValue).subscribe((option) => {
          this.selected_question_option = option;
        });
      }

    }

  }

  getData(searchText: string): Observable<Option[]> {

    this.subject = new BehaviorSubject<Option[]>([]);

    const OptionsObservable = this.dataSource.searchOptions(searchText);

    OptionsObservable.subscribe(
      (options) => {
        // console.log('options', options);
        const mappedOptions: Option[] = new Array<Option>();

        for (let i = 0; i < options.length; i++) {
          mappedOptions.push(new Option(options[i]));
        }
        this.subject.next(mappedOptions);
      },
      (error) => {
        this.subject.error(error);
      }
    );

    return this.subject.asObservable();
  }

  onValueChange(event) { }
  resolveSelectedOption(value: any): Observable<Option> {

    this.subjectOption = new BehaviorSubject<Option>(null);
    const OptionObservable = this.dataSource.resolveSelectedValue(value);

    OptionObservable.subscribe(
      (option) => {
        // console.log('option', option);
        this.subjectOption.next(option);
      },
      (error) => {
        this.subjectOption.error(error);
      }
    );

    return this.subjectOption.asObservable();
  }

  resetOptions() {
    this.subject.next(new Array<Option>());

  }

}
