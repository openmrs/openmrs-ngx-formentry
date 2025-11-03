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

export interface Alert {
  shown: boolean;
  alertWhenExpression: string;
  alertMessage: string | SafeHtml;
  reEvaluateAlertExpression: EvaluateExpressionFn;
}

export interface EvaluateExpressionFn {
  ();
}
