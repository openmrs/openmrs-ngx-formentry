import { Observable } from 'rxjs';

export interface CanGenerateAlert {
  alerts: Alert[];
  alert: string;
  valueChanges?: Observable<any>;
  setAlertFn(newMessage: Alert);
  clearMessageFns();
  updateAlert();
}

export interface AlertConfig {
  alertWhenExpression: string;
  message: string;
}

export interface Alert {
  shown: boolean;
  alertWhenExpression: string;
  message: string;
  reEvaluateAlertExpression: EvaluateExpressionFn;
}

export interface EvaluateExpressionFn {
  ();
}
