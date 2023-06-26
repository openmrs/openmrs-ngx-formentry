import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { DisablerHelper } from './disabler-helper';
import { CanDisable, Disabler } from './can-disable';

describe('Control Disabler Helper Service:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisablerHelper]
    });
  });

  it('should be defined', () => {
    const helper: DisablerHelper = TestBed.inject(DisablerHelper);
    expect(helper).toBeTruthy();
  });

  it('should set a disabler for a control', () => {
    const helper: DisablerHelper = TestBed.inject(DisablerHelper);

    const control: CanDisable = {
      disabled: true,
      clearDisablingFns: () => {},
      disable: () => {},
      enable: () => {},
      disablers: [],
      updateDisabledState: () => {},
      setDisablingFn: (newHider: Disabler) => {
        helper.setDisablerForControl(control, newHider);
      }
    };

    const disabler: Disabler = {
      toDisable: false,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {}
    };

    control.setDisablingFn(disabler);

    expect(control.disablers.length).toBe(1);
    expect(control.disablers[0]).toBe(disabler);
  });

  it('should clear disablers for a control', () => {
    const helper: DisablerHelper = TestBed.inject(DisablerHelper);

    const control: CanDisable = {
      disabled: true,
      clearDisablingFns: () => {
        helper.clearDisablersForControl(control);
      },
      disable: () => {
        control.disabled = false;
      },
      enable: () => {},
      disablers: [],
      updateDisabledState: () => {},
      setDisablingFn: (newHider: Disabler) => {}
    };

    const disabler: Disabler = {
      toDisable: false,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {}
    };

    helper.setDisablerForControl(control, disabler);

    expect(control.disablers.length).toBe(1);
    expect(control.disablers[0]).toBe(disabler);

    control.clearDisablingFns();

    expect(control.disablers.length).toBe(0);

    // should have set disabled to false after clearing
    expect(control.disabled).toBe(false);
  });

  it('should evaluate all controls disablers to determine whether to disable the control', () => {
    const helper: DisablerHelper = TestBed.inject(DisablerHelper);

    // test case 1: should be disabled if one of the disablers is true
    const control: CanDisable = {
      disabled: false,
      clearDisablingFns: () => {},
      disable: () => {
        control.disabled = true;
      },
      enable: () => {
        control.disabled = false;
      },
      disablers: [],
      updateDisabledState: () => {
        helper.evaluateControlDisablers(control);
      },
      setDisablingFn: (newHider: Disabler) => {}
    };

    const hider1: Disabler = {
      toDisable: false,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {
        hider1.toDisable = true;
      }
    };

    const hider2: Disabler = {
      toDisable: true,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {
        hider2.toDisable = false;
      }
    };

    const hider3: Disabler = {
      toDisable: false,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {
        hider3.toDisable = true;
      }
    };

    control.disablers.push(hider1);
    control.disablers.push(hider2);
    control.disablers.push(hider3);

    control.updateDisabledState();

    expect(control.disablers[0].toDisable).toBe(true);
    expect(control.disablers[1].toDisable).toBe(false);
    expect(control.disablers[2].toDisable).toBe(true);
    expect(control.disabled).toBe(true);

    // test case 2: should not be disabled if none of the disablers is false
    const control2: CanDisable = {
      disabled: true,
      clearDisablingFns: () => {},
      disable: () => {
        control2.disabled = true;
      },
      enable: () => {
        control2.disabled = false;
      },
      disablers: [],
      updateDisabledState: () => {
        helper.evaluateControlDisablers(control2);
      },
      setDisablingFn: (newHider: Disabler) => {}
    };

    const hider4: Disabler = {
      toDisable: true,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {
        hider4.toDisable = false;
      }
    };

    const hider5: Disabler = {
      toDisable: true,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {
        hider5.toDisable = false;
      }
    };

    control2.disablers.push(hider4);
    control2.disablers.push(hider5);

    control2.updateDisabledState();

    expect(control2.disablers[0].toDisable).toBe(false);
    expect(control2.disablers[1].toDisable).toBe(false);
    expect(control2.disabled).toBe(false);
  });

  it('should trigger reEvaluation of a controls disabled status when control value changes', () => {
    const helper: DisablerHelper = TestBed.inject(DisablerHelper);

    const subject: Subject<any> = new Subject<any>();

    const control: CanDisable = {
      disabled: false,
      clearDisablingFns: () => {},
      disable: () => {
        control.disabled = true;
      },
      enable: () => {
        control.disabled = false;
      },
      disablers: [],
      updateDisabledState: () => {
        helper.evaluateControlDisablers(control);
      },
      setDisablingFn: (newHider: Disabler) => {},
      valueChanges: subject.asObservable()
    };

    const hider1: Disabler = {
      toDisable: false,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {
        hider1.toDisable = true;
      }
    };

    const hider2: Disabler = {
      toDisable: true,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {
        hider2.toDisable = false;
      }
    };

    const hider3: Disabler = {
      toDisable: false,
      disableWhenExpression: 'true',
      resetValueOnDisable: true,
      reEvaluateDisablingExpression: () => {
        hider3.toDisable = true;
      }
    };

    control.disablers.push(hider1);
    control.disablers.push(hider2);
    control.disablers.push(hider3);

    helper.setUpReEvaluationWhenValueChanges(control);

    expect(control.disablers[0].toDisable).toBe(false);
    expect(control.disablers[1].toDisable).toBe(true);
    expect(control.disablers[2].toDisable).toBe(false);
    expect(control.disabled).toBe(false);

    subject.next(30);

    expect(control.disablers[0].toDisable).toBe(true);
    expect(control.disablers[1].toDisable).toBe(false);
    expect(control.disablers[2].toDisable).toBe(true);
    expect(control.disabled).toBe(true);
  });
});
