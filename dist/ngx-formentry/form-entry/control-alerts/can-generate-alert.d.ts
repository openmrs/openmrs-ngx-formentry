import { Observable } from 'rxjs';
export interface CanGenerateAlert {
    alerts: Alert[];
    alert: string;
    valueChanges?: Observable<any>;
    setAlertFn(newMessage: Alert): any;
    clearMessageFns(): any;
    updateAlert(): any;
}
export interface Alert {
    shown: boolean;
    alertWhenExpression: string;
    alertMessage: string;
    reEvaluateAlertExpression: EvaluateExpressionFn;
}
export interface EvaluateExpressionFn {
    (): any;
}
