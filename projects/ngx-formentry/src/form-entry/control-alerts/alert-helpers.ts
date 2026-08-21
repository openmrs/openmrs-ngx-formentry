import { CanGenerateAlert, Alert } from './can-generate-alert';
export class AlertHelper {
  public hideAlert(control: Alert) {
    control.shown = false;
  }

  public showAlert(control: Alert) {
    control.shown = true;
  }

  public setAlertsForControl(control: CanGenerateAlert, alert: Alert) {
    control.alerts.push(alert);
  }

  public clearAlertsForControl(control: CanGenerateAlert) {
    control.alerts.splice(0);
    control.alert = '';
  }

  public evaluateControlAlerts(control: CanGenerateAlert) {
    // Re-evaluate all alerts so their `shown` state is current, then pick the first match.
    control.alerts.forEach((a) => a.reEvaluateAlertExpression());
    const first = control.alerts.find((a) => a.shown);
    control.alert = first ? first.message : '';
    // if (control.message && control.disable) {
    //     control.disable();
    //     // control.setValue(null);
    // }
  }

  public setUpReEvaluationWhenValueChanges(control: CanGenerateAlert) {
    if (control.updateAlert) {
      control.valueChanges.subscribe((val) => {
        control.updateAlert();
      });
    }
  }
}
