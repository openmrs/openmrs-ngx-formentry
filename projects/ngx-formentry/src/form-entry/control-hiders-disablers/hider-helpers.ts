import { CanHide, Hider } from './can-hide';
export class HiderHelper {
  public hideControl(control: CanHide) {
    control.hidden = true;
    if (control.disable) {
      control.disable();
    }
  }

  public showControl(control: CanHide) {
    control.hidden = false;
  }

  public setHiderForControl(control: CanHide, hider: Hider) {
    control.hiders.push(hider);
  }

  public clearHidersForControl(control: CanHide) {
    control.hiders.splice(0);
    control.hidden = false;
  }

  public evaluateControlHiders(control: CanHide) {
    let hiddenValue = false;
    control.hiders.forEach((hider) => {
      hider.reEvaluateHidingExpression();
      if (hider.toHide === true) {
        hiddenValue = true;
        // Some controls (e.g. patient identifiers populated on edit) must keep
        // their value while hidden so it is still present when a hiding
        // expression later reveals them. Only clear the value otherwise.
        if (!control.retainValueWhenHidden) {
          control.setValue(null);
        }
      }
    });

    control.hidden = hiddenValue;
    if (control.hidden && control.disable) {
      control.disable();
      // control.setValue(null);
    }
  }

  public setUpReEvaluationWhenValueChanges(control: CanHide) {
    if (control.updateHiddenState) {
      control.valueChanges.subscribe((val) => {
        control.updateHiddenState();
      });
    }
  }
}
