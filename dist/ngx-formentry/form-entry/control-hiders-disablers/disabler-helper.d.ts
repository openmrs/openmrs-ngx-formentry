import { CanDisable, Disabler } from './can-disable';
export declare class DisablerHelper {
    setDisablerForControl(control: CanDisable, disabler: Disabler): void;
    clearDisablersForControl(control: CanDisable): void;
    evaluateControlDisablers(control: CanDisable): void;
    setUpReEvaluationWhenValueChanges(control: CanDisable): void;
}
