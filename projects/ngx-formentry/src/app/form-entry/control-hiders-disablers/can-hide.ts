import { Observable } from 'rxjs/Rx';

import { EvaluateExpressionFn } from './can-disable';

export interface CanHide {
    hiders: Hider[];
    hidden: boolean;
    disabled?: boolean;
    valueChanges?: Observable<any>;
    disable?();
    hide();
    show();
    setHidingFn(newHider: Hider);
    clearHidingFns();
    updateHiddenState();
}

export interface Hider {
    toHide: boolean;
    hideWhenExpression: string;
    reEvaluateHidingExpression: EvaluateExpressionFn;
}


