import { Observable } from 'rxjs';
export interface CanDisable {
    disablers: Disabler[];
    disabled: boolean;
    valueChanges?: Observable<any>;
    disable(): any;
    enable(): any;
    setDisablingFn(newHider: Disabler): any;
    clearDisablingFns(): any;
    updateDisabledState(): any;
}
export interface Disabler {
    toDisable: boolean;
    disableWhenExpression: string;
    reEvaluateDisablingExpression: EvaluateExpressionFn;
}
export interface EvaluateExpressionFn {
    (): any;
}
