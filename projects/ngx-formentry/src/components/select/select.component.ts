import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Output,
  HostListener,
  EventEmitter,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * `ofe-select` provides a styled `select` component.
 *
 * [See demo](../../?path=/story/select--basic)
 *
 * Example:
 *
 * ```
 * <ofe-select [(ngModel)]="model">
 *     <option value="default" disabled selected hidden>Choose an option</option>
 *     <option value="option1">Option 1</option>
 *    <option value="option2">Option 2</option>
 *     <option value="option3">Option 3</option>
 * </ofe-select>
 *    ```
 *
 * <example-url>../../iframe.html?id=select--basic</example-url>
 */
@Component({
  selector: 'ofe-select',
  templateUrl: 'select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  /**
   * Tracks the total number of selects instantiated. Used to generate unique IDs
   */
  static selectCount = 0;

  /**
   * `inline` or `default` select displays
   */
  @Input() display: 'inline' | 'default' = 'default';
  /**
   * Label for the select. Appears above the input.
   */
  @Input() label: string | TemplateRef<any>;
  /**
   * Optional helper text that appears under the label.
   */
  @Input() helperText: string | TemplateRef<any>;
  /**
   * Sets the invalid text.
   */
  @Input() invalidText: string | TemplateRef<any>;
  /**
   * Set to `true` to show a warning (contents set by warningText)
   */
  @Input() warn = false;
  /**
   * Sets the warning text
   */
  @Input() warnText: string | TemplateRef<any>;
  /**
   * Sets the unique ID. Defaults to `select-${total count of selects instantiated}`
   */
  @Input() id = `select-${SelectComponent.selectCount++}`;
  /**
   * Number input field render size
   */
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  /**
   * Set to true to disable component.
   */
  @Input() disabled = false;
  /**
   * Set to true for a loading select.
   */
  @Input() skeleton = false;
  /**
   * Set to `true` for an invalid select component.
   */
  @Input() invalid = false;

  /**
   * `light` or `dark` select theme
   */
  @Input() theme: 'light' | 'dark' = 'dark';
  @Input() ariaLabel: string;

  @Output() valueChange = new EventEmitter();

  @ViewChild('select', { static: false }) select: ElementRef;

  @Input() set value(v) {
    this._value = v;
    if (this.select) {
      this.select.nativeElement.value = this._value;
    }
  }

  get value() {
    return this._value;
  }

  protected _value;

  ngAfterViewInit() {
    if (
      this.value !== undefined &&
      this.value !== null &&
      this.select &&
      this.select.nativeElement.value !== this.value
    ) {
      this.select.nativeElement.value = this.value;
    }
  }

  /**
   * Receives a value from the model.
   */
  writeValue(obj: any) {
    this.value = obj;
  }

  /**
   * Registers a listener that notifies the model when the control updates
   */
  registerOnChange(fn: any) {
    this.onChangeHandler = fn;
  }

  /**
   * Registers a listener that notifies the model when the control is blurred
   */
  registerOnTouched(fn: any) {
    this.onTouchedHandler = fn;
  }

  /**
   * Sets the disabled state through the model
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /**
   * Handles the change event from the `select`.
   * Sends events to the change handler and emits a `selected` event.
   */
  onChange(event) {
    this.value = event.target.value;
    this.onChangeHandler(event.target.value);
    this.valueChange.emit(event.target.value);
  }

  /**
   * Listens for the host blurring, and notifies the model
   */
  @HostListener('focusout')
  focusOut() {
    this.onTouchedHandler();
  }

  public isTemplate(value) {
    return value instanceof TemplateRef;
  }

  /**
   * placeholder declarations. Replaced by the functions provided to `registerOnChange` and `registerOnTouched`
   */
  protected onChangeHandler = (_: any) => {};
  protected onTouchedHandler = () => {};
}
