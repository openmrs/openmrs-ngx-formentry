import {
  Component,
  Input,
  forwardRef,
  OnInit,
  AfterViewInit
} from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonControlComponent),
      multi: true
    }
  ]
})
export class RadioButtonControlComponent implements OnInit, AfterViewInit {
  @Input() public id: String;
  @Input() public selected: any;
  @Input() public options: Array<any>;
  @Input() public allowRadioUnselect: Boolean;

  public ngOnInit() {
    this.options = this.options.map((option) => {
      if (this.selected == option.value) {
        this.selected = option.value;
        Object.assign(option, { checked: true });
      }
      return option;
    });
  }

  public ngAfterViewInit() {}

  public writeValue(value: any) {}

  public registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  public selectOpt(option, event) {
    this.options.forEach((o) => {
      if (event.target.checked && o.value == option.value) {
        this.selected = o.value;
        Object.assign(o, { checked: true });
      } else {
        this.selected = null;
        Object.assign(o, { checked: false });
      }
    });
  }

  public selectUnselectOpt(option, event) {
    this.options.forEach((o) => {
      if (
        event.target.checked &&
        this.selected == o.value &&
        this.selected == option.value
      ) {
        this.selected = null;
        Object.assign(o, { checked: false });
      } else if (event.target.checked && o.value == option.value) {
        this.selected = o.value;
        Object.assign(o, { checked: true });
      }
    });
  }

  private onChange = (change: any) => {};
  private onTouched = () => {};
}
