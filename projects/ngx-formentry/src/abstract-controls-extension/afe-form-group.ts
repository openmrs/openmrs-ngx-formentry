import {
  UntypedFormGroup,
  ValidatorFn,
  AsyncValidatorFn,
  AbstractControl
} from '@angular/forms';

import { ControlRelations } from '../change-tracking/control-relations';

import {
  CanHide,
  Hider
} from '../form-entry/control-hiders-disablers/can-hide';
import {
  CanDisable,
  Disabler
} from '../form-entry/control-hiders-disablers/can-disable';
import {
  CanGenerateAlert,
  Alert
} from '../form-entry/control-alerts/can-generate-alert';
import { HiderHelper } from '../form-entry/control-hiders-disablers/hider-helpers';
import { DisablerHelper } from '../form-entry/control-hiders-disablers/disabler-helper';
import { AlertHelper } from '../form-entry/control-alerts/alert-helpers';

export class AfeFormGroup
  extends UntypedFormGroup
  implements CanHide, CanDisable, CanGenerateAlert {
  private _controlRelations: ControlRelations;

  public uuid: string;
  public pathFromRoot: string;

  hidden: false;
  hiders: Hider[];
  alert: string;
  alerts: Alert[];

  disablers: Disabler[];

  private hiderHelper: HiderHelper = new HiderHelper();
  private disablerHelper: DisablerHelper = new DisablerHelper();
  private AlertHelper: AlertHelper = new AlertHelper();

  constructor(
    controls: { [key: string]: AbstractControl },
    validator?: ValidatorFn,
    asyncValidator?: AsyncValidatorFn
  ) {
    super(controls, validator, asyncValidator);
    this._controlRelations = new ControlRelations(this);
    this.hiders = [];
    this.disablers = [];
    this.alerts = [];
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
      super.setValue({});
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
  setValue(value: any) {
    super.setValue(value);
    if (this.alerts.length > 0) {
      this.updateAlert();
    }
  }
}
