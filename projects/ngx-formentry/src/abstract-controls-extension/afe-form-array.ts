import {
  UntypedFormArray,
  ValidatorFn,
  AsyncValidatorFn,
  AbstractControl
} from '@angular/forms';

import { ControlRelations } from '../change-tracking/control-relations';
import { ValueChangeListener } from './value-change.listener';
import {
  CanHide,
  Hider
} from '../form-entry/control-hiders-disablers/can-hide';
import {
  CanGenerateAlert,
  Alert
} from '../form-entry/control-alerts/can-generate-alert';
import {
  CanDisable,
  Disabler
} from '../form-entry/control-hiders-disablers/can-disable';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';

export class AfeFormArray
  extends UntypedFormArray
  implements CanHide, CanDisable, CanGenerateAlert, ValueChangeListener {
  private _controlRelations: ControlRelations;
  private _valueChangeListener: any;
  private _previousValue;
  private _uuid: string;
  public pathFromRoot: string;

  hidden: false;
  hiders: Hider[];

  alert: string;
  alerts: Alert[];

  disablers: Disabler[];

  private hiderHelper: HiderHelper = new HiderHelper();
  private AlertHelper: AlertHelper = new AlertHelper();
  private disablerHelper: DisablerHelper = new DisablerHelper();

  constructor(
    controls: AbstractControl[],
    validator?: ValidatorFn,
    asyncValidator?: AsyncValidatorFn
  ) {
    super(controls, validator, asyncValidator);
    this._controlRelations = new ControlRelations(this);
    this.hiders = [];
    this.alerts = [];
    this.disablers = [];

    this.valueChanges.subscribe((value) => {
      if (this._previousValue !== value) {
        this.fireValueChangeListener(value);
        this._previousValue = value;
      }
    });
  }

  get uuid(): string {
    return this._uuid;
  }
  set uuid(val: string) {
    this._uuid = val;
  }

  get controlRelations(): ControlRelations {
    return this._controlRelations;
  }

  hide() {
    this.hiderHelper.hideControl(this);
  }

  show() {
    this.hiderHelper.showControl(this);
  }

  disable(param?: { onlySelf?: boolean; emitEvent?: boolean }) {
    super.disable(param);
    if (
      this.disablers.some((disabler) => disabler.resetValueOnDisable === true)
    ) {
      super.setValue([]);
    }
  }

  setHidingFn(newHider: Hider) {
    this.hiderHelper.setHiderForControl(this, newHider);
  }

  clearHidingFns() {
    this.hiderHelper.clearHidersForControl(this);
  }

  updateHiddenState() {
    this.hiderHelper.evaluateControlHiders(this);
  }

  setDisablingFn(newDisabler: Disabler) {
    this.disablerHelper.setDisablerForControl(this, newDisabler);
  }

  clearDisablingFns() {
    this.disablerHelper.clearDisablersForControl(this);
  }

  updateDisabledState() {
    this.disablerHelper.evaluateControlDisablers(this);
  }

  setAlertFn(newHider: Alert) {
    this.AlertHelper.setAlertsForControl(this, newHider);
  }

  clearMessageFns() {
    this.AlertHelper.clearAlertsForControl(this);
  }

  updateAlert() {
    this.AlertHelper.evaluateControlAlerts(this);
  }

  addValueChangeListener(func: any) {
    this._valueChangeListener = func;
  }

  fireValueChangeListener(value: any) {
    if (this.alerts.length > 0) {
      this.updateAlert();
    }
    if (
      this._valueChangeListener &&
      typeof this._valueChangeListener === 'function'
    ) {
      this._valueChangeListener(value);
    }
  }

  setValue(value: any) {
    super.setValue(value);
  }
}
