import { Observable } from 'rxjs';

export interface CanDisable {
    disablers: Disabler[];
    disabled: boolean;
    valueChanges?: Observable<any>;
    disable();
    enable();
    setDisablingFn(newHider: Disabler);
    clearDisablingFns();
    updateDisabledState();
}

export interface Disabler {
    toDisable: boolean;
    disableWhenExpression: string;
    reEvaluateDisablingExpression: EvaluateExpressionFn;
}

export interface EvaluateExpressionFn {
    ();
}
