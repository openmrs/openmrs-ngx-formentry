import { Observable } from 'rxjs/Rx';

export interface CanGenerateAlert {
    alerts: Alert[];
    alert: string;
    valueChanges?: Observable<any>;
    setAlertFn(newMessage: Alert);
    clearMessageFns();
    updateAlert();
}

export interface Alert {
    shown: boolean;
    alertWhenExpression: string;
    alertMessage: string;
    reEvaluateAlertExpression: EvaluateExpressionFn;
}

export interface EvaluateExpressionFn {
    ();
}
