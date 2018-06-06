import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { DisablerHelper } from './disabler-helper';
import { CanDisable, Disabler } from './can-disable';


describe('Control Disabler Helper Service:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DisablerHelper
            ]
        });
    });

    it('should be defined', () => {
        let helper: DisablerHelper = TestBed.get(DisablerHelper);
        expect(helper).toBeTruthy();
    });

    it('should set a disabler for a control', () => {
        let helper: DisablerHelper = TestBed.get(DisablerHelper);

        let control: CanDisable = {
            disabled: true,
            clearDisablingFns: () => { },
            disable: () => { },
            enable: () => { },
            disablers: [],
            updateDisabledState: () => { },
            setDisablingFn: (newHider: Disabler) => { helper.setDisablerForControl(control, newHider); }
        };

        let Disabler: Disabler = {
            toDisable: false,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { }
        };


        control.setDisablingFn(Disabler);

        expect(control.disablers.length).toBe(1);
        expect(control.disablers[0]).toBe(Disabler);
    });

    it('should clear disablers for a control', () => {
        let helper: DisablerHelper = TestBed.get(DisablerHelper);

        let control: CanDisable = {
            disabled: true,
            clearDisablingFns: () => { helper.clearDisablersForControl(control); },
            disable: () => { control.disabled = false; },
            enable: () => { },
            disablers: [],
            updateDisabledState: () => { },
            setDisablingFn: (newHider: Disabler) => { }
        };

        let Disabler: Disabler = {
            toDisable: false,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { }
        };


        helper.setDisablerForControl(control, Disabler);

        expect(control.disablers.length).toBe(1);
        expect(control.disablers[0]).toBe(Disabler);

        control.clearDisablingFns();

        expect(control.disablers.length).toBe(0);

        // should have set disabled to false after clearing
        expect(control.disabled).toBe(false);
    });

    it('should evaluate all controls disablers to determine whether to disable the control', () => {
        let helper: DisablerHelper = TestBed.get(DisablerHelper);

        // test case 1: should be disabled if one of the disablers is true
        let control: CanDisable = {
            disabled: false,
            clearDisablingFns: () => { },
            disable: () => { control.disabled = true; },
            enable: () => { control.disabled = false; },
            disablers: [],
            updateDisabledState: () => { helper.evaluateControlDisablers(control); },
            setDisablingFn: (newHider: Disabler) => { }
        };

        let hider1: Disabler = {
            toDisable: false,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { hider1.toDisable = true; }
        };

        let hider2: Disabler = {
            toDisable: true,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { hider2.toDisable = false; }
        };

        let hider3: Disabler = {
            toDisable: false,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { hider3.toDisable = true; }
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
        let control2: CanDisable = {
            disabled: true,
            clearDisablingFns: () => { },
            disable: () => { control2.disabled = true; },
            enable: () => { control2.disabled = false; },
            disablers: [],
            updateDisabledState: () => { helper.evaluateControlDisablers(control2); },
            setDisablingFn: (newHider: Disabler) => { }
        };

        let hider4: Disabler = {
            toDisable: true,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { hider4.toDisable = false; }
        };

        let hider5: Disabler = {
            toDisable: true,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { hider5.toDisable = false; }
        };

        control2.disablers.push(hider4);
        control2.disablers.push(hider5);

        control2.updateDisabledState();

        expect(control2.disablers[0].toDisable).toBe(false);
        expect(control2.disablers[1].toDisable).toBe(false);
        expect(control2.disabled).toBe(false);

    });

    it('should trigger reEvaluation of a controls disabled status when control value changes', () => {
        let helper: DisablerHelper = TestBed.get(DisablerHelper);

        let subject: Subject<any> = new Subject<any>();

        let control: CanDisable = {
            disabled: false,
            clearDisablingFns: () => { },
            disable: () => { control.disabled = true; },
            enable: () => { control.disabled = false; },
            disablers: [],
            updateDisabledState: () => { helper.evaluateControlDisablers(control); },
            setDisablingFn: (newHider: Disabler) => { },
            valueChanges: subject.asObservable()
        };

        let hider1: Disabler = {
            toDisable: false,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { hider1.toDisable = true; }
        };

        let hider2: Disabler = {
            toDisable: true,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { hider2.toDisable = false; }
        };

        let hider3: Disabler = {
            toDisable: false,
            disableWhenExpression: 'true',
            reEvaluateDisablingExpression: () => { hider3.toDisable = true; }
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
