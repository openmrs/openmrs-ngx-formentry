import { Observable } from 'rxjs';

import { EvaluateExpressionFn } from './can-disable';

export interface CanHide {
  hiders: Hider[];
  hidden: boolean;
  // When true, the control keeps its value while hidden instead of being
  // cleared, so the value is still present if a hiding expression later reveals
  // it (used for patient identifiers populated on edit).
  retainValueWhenHidden?: boolean;
  disabled?: boolean;
  valueChanges?: Observable<any>;
  disable?();
  hide();
  show();
  setHidingFn(newHider: Hider);
  clearHidingFns();
  updateHiddenState();
  setValue?(value: any);
}

export interface Hider {
  toHide: boolean;
  hideWhenExpression: string;
  reEvaluateHidingExpression: EvaluateExpressionFn;
}
