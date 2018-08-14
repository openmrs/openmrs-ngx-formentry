import { Observable } from 'rxjs';
import { EvaluateExpressionFn } from './can-disable';
export interface CanHide {
    hiders: Hider[];
    hidden: boolean;
    disabled?: boolean;
    valueChanges?: Observable<any>;
    disable?(): any;
    hide(): any;
    show(): any;
    setHidingFn(newHider: Hider): any;
    clearHidingFns(): any;
    updateHiddenState(): any;
    setValue?(value: any): any;
}
export interface Hider {
    toHide: boolean;
    hideWhenExpression: string;
    reEvaluateHidingExpression: EvaluateExpressionFn;
}
