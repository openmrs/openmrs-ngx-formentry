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
    let messageValue = '';
    control.alerts.forEach((message) => {
      message.reEvaluateAlertExpression();
      if (message.shown === true) {
        messageValue = message.alertMessage;
      } else {
        messageValue = '';
      }
    });

    control.alert = messageValue;
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
