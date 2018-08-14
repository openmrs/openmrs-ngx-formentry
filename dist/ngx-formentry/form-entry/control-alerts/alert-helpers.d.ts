import { CanGenerateAlert, Alert } from './can-generate-alert';
export declare class AlertHelper {
    hideAlert(control: Alert): void;
    showAlert(control: Alert): void;
    setAlertsForControl(control: CanGenerateAlert, alert: Alert): void;
    clearAlertsForControl(control: CanGenerateAlert): void;
    evaluateControlAlerts(control: CanGenerateAlert): void;
    setUpReEvaluationWhenValueChanges(control: CanGenerateAlert): void;
}
