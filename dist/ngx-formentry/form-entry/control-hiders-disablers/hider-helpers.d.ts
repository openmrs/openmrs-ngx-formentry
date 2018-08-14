import { CanHide, Hider } from './can-hide';
export declare class HiderHelper {
    hideControl(control: CanHide): void;
    showControl(control: CanHide): void;
    setHiderForControl(control: CanHide, hider: Hider): void;
    clearHidersForControl(control: CanHide): void;
    evaluateControlHiders(control: CanHide): void;
    setUpReEvaluationWhenValueChanges(control: CanHide): void;
}
