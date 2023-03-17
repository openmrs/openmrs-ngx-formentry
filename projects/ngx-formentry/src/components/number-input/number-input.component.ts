import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Used to emit changes performed on number input components.
 */
export class NumberChangeEvent {
  /**
   * Contains the `NumberInputComponent` that has been changed.
   */
  source: NumberInputComponent;
  /**
   * The value of the `NumberInputComponent` field encompassed in the `NumberChange` class.
   */
  value: number;
}

@Component({
  selector: 'ofe-number-input',
  templateUrl: 'number-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})
export class NumberInputComponent implements ControlValueAccessor {
  /**
   * Variable used for creating unique ids for number input components.
   */
  static numberCount = 0;

  /**
   * `light` or `dark` number input theme.
   */
  @Input() theme: 'light' | 'dark' = 'dark';
  /**
   * Set to `true` for a disabled number input.
   */
  @Input() disabled = false;
  /**
   * Set to `true` for a loading number component.
   */
  @Input() skeleton = false;
  /**
   * Set to `true` for an invalid number component.
   */
  @Input() invalid = false;
  /**
   * The unique id for the number component.
   */
  @Input() id = `number-${NumberInputComponent.numberCount}`;
  /**
   * Number input field render size
   */
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  /**
   * Reflects the required attribute of the `input` element.
   */
  @Input() required: boolean;
  /**
   * Sets the value attribute on the `input` element.
   */
  @Input() set value(v: any) {
    if (v === '' || v === null) {
      this._value = null;
      return;
    }
    this._value = Number(v);
  }

  get value() {
    return this._value;
  }
  /**
   * Sets the min attribute on the `input` element.
   */
  @Input() min = null;
  /**
   * Sets the max attribute on the `input` element.
   */
  @Input() max = null;
  /**
   * Sets the max length attribute on the `input` element.
   */
   @Input() maxlength = null;
  /**
   * Sets the text inside the `label` tag.
   */
  @Input() label: string | TemplateRef<any>;
  /**
   * Sets the optional helper text.
   */
  @Input() helperText: string | TemplateRef<any>;
  /**
   * Sets the invalid text.
   */
  @Input() invalidText: string | TemplateRef<any>;
  /**
   * Sets the amount the number controls increment and decrement by.
   */
  @Input() step = 1;
  /**
   * If `step` is a decimal, we may want precision to be set to go around floating point precision.
   */
  @Input() precision: number;
  /**
   * Set to `true` to show a warning (contents set by warningText)
   */
  @Input() warn = false;
  /**
   * Sets the warning text
   */
  @Input() warnText: string | TemplateRef<any>;
  /**
   * Emits event notifying other classes when a change in state occurs in the input.
   */
  @Output() numberChange = new EventEmitter<NumberChangeEvent>();
  /**
   * Sets the decrement label text
   */
  @Input() decrementLabel = 'Decrease';
  /**
   * Sets the increment label text
   */
  @Input() incrementLabel = 'Increase';

  protected _value = 0;

  /**
   * Creates an instance of `Number`.
   */
  constructor() {
    NumberInputComponent.numberCount++;
  }

  /**
   * This is the initial value set to the component
   * @param value The input value.
   */
  public writeValue(value: any) {
    this.value = value;
  }

  /**
   * Sets a method in order to propagate changes back to the form.
   */
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  /**
   * Registers a callback to be triggered when the control has been touched.
   * @param fn Callback to be triggered when the number input is touched.
   */
  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('focusout')
  focusOut() {
    this.onTouched();
  }

  /**
   * Sets the disabled state through the model
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /**
   * Called when number input is blurred. Needed to properly implement `ControlValueAccessor`.
   */
  onTouched: () => any = () => {};

  /**
   * Method set in `registerOnChange` to propagate changes back to the form.
   */
  propagateChange = (_: any) => {};

  /**
   * Adds `step` to the current `value`.
   */
  onIncrement(): void {
    const val = this._value || 0;

    if (this.max === null || val + this.step <= this.max) {
      this.value = parseFloat((val + this.step).toPrecision(this.precision));
    } else {
      this.value = this.max;
    }

    this.emitChangeEvent();
  }

  /**
   * Subtracts `step` to the current `value`.
   */
  onDecrement(): void {
    const val = this._value || 0;

    if (this.min === null || val - this.step >= this.min) {
      this.value = parseFloat((val - this.step).toPrecision(this.precision));
    } else {
      this.value = this.min;
    }

    this.emitChangeEvent();
  }

  /**
   * Creates a class of `NumberChange` to emit the change in the `Number`.
   */
  emitChangeEvent(): void {
    const event = new NumberChangeEvent();
    event.source = this;
    event.value = this.value;
    this.numberChange.emit(event);
    this.propagateChange(this.value);
  }

  onNumberInputChange(event) {
    this.value = event.target.value;
    this.emitChangeEvent();
  }

  public isTemplate(value) {
    return value instanceof TemplateRef;
  }
}
