import { Observable } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

export interface CanGenerateAlert {
  alerts: Alert[];
  alert: string | SafeHtml;
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
  message: string | SafeHtml;
  reEvaluateAlertExpression: EvaluateExpressionFn;
}

export interface EvaluateExpressionFn {
  ();
}
