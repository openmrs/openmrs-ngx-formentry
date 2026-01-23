import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { OwlDateTimeComponent } from './date-time-picker.component';
import { merge, of as observableOf, Subscription } from 'rxjs';

@Directive({
    selector: '[ofeOwlDateTimeTrigger]',
    standalone: false
})
export class OwlDateTimeTriggerDirective<T>
  implements OnChanges, AfterContentInit, OnDestroy {
  @Input('ofeOwlDateTimeTrigger') dtPicker: OwlDateTimeComponent<T>;

  @HostBinding('class.owl-dt-trigger-disabled')
  get owlDTTriggerDisabledClass(): boolean {
    return this.disabled;
  }

  @HostListener('click', ['$event'])
  handleClickOnHost($event: Event): void {
    if (this.dtPicker) {
      this.dtPicker.open();
      $event.stopPropagation();
    }
  }

  private _disabled: boolean;
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined
      ? this.dtPicker.disabled
      : !!this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  private stateChanges = Subscription.EMPTY;

  constructor(protected changeDetector: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.datepicker) {
      this.watchStateChanges();
    }
  }

  public ngAfterContentInit() {
    this.watchStateChanges();
  }

  public ngOnDestroy(): void {
    this.stateChanges.unsubscribe();
  }

  private watchStateChanges(): void {
    this.stateChanges.unsubscribe();

    const inputDisabled$ =
      this.dtPicker && this.dtPicker.dtInput
        ? this.dtPicker.dtInput.disabledChange
        : observableOf(false);

    const pickerDisabled$ = this.dtPicker
      ? this.dtPicker.disabledChange
      : observableOf(false);

    this.stateChanges = merge(pickerDisabled$, inputDisabled$).subscribe(() => {
      this.changeDetector.markForCheck();
    });
  }
}
