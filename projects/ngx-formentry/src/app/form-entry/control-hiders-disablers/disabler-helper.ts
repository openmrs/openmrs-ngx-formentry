import { CanDisable, Disabler } from './can-disable';
export class DisablerHelper {

    public setDisablerForControl(control: CanDisable, disabler: Disabler) {
        control.disablers.push(disabler);
    }

    public clearDisablersForControl(control: CanDisable) {
        control.disablers.splice(0);
        control.disable();
    }

    public evaluateControlDisablers(control: CanDisable) {
        let toDisable = false;
        control.disablers.forEach(hider => {
            hider.reEvaluateDisablingExpression();
            if (hider.toDisable === true) {
                toDisable = true;
            }
        });

        if (toDisable) {
            control.disable();
        } else {
            control.enable();
        }
    }

    public setUpReEvaluationWhenValueChanges(control: CanDisable) {
        if (control.updateDisabledState) {
            control.valueChanges.subscribe((val) => {
                control.updateDisabledState();
            });
        }
    }

}
