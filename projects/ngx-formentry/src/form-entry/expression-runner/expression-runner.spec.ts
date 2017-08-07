import { TestBed } from '@angular/core/testing';

import { Runnable, ExpressionRunner } from './expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension/control-extensions';


describe('Control Hider Helper Service:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ExpressionRunner
            ]
        });
    });

    it('should be defined', () => {
        let runner: ExpressionRunner = TestBed.get(ExpressionRunner);
        expect(runner).toBeTruthy();
    });

    it('should run basic js epxression wihtout references, data dependencies and helpers', () => {
        let runner: ExpressionRunner = TestBed.get(ExpressionRunner);
        let control = new AfeFormControl();
        let expresion = '1===1';
        let runnable: Runnable = runner.getRunnable(expresion, control, {}, {});
        expect(runnable.run()).toBe(true);
    });

    it('should run js epxression wth references', () => {
        let runner: ExpressionRunner = TestBed.get(ExpressionRunner);
        let control = new AfeFormControl();
        control.uuid = 'a';
        let control2 = new AfeFormControl();
        control2.uuid = 'b';
        control2.setValue(20);
        let control3 = new AfeFormControl();
        control3.uuid = 'c';
        control3.setValue(30);

        control.controlRelations.addRelatedControls(control2);
        control.controlRelations.addRelatedControls(control3);


        let expresion = 'b + c';
        let runnable: Runnable = runner.getRunnable(expresion, control, {}, {});
        expect(runnable.run()).toBe(50);
    });

    it('should run js epxression wth helper functions', () => {
        let runner: ExpressionRunner = TestBed.get(ExpressionRunner);
        let control = new AfeFormControl();
        control.uuid = 'a';
        let control2 = new AfeFormControl();
        control2.uuid = 'b';
        control2.setValue(20);
        let control3 = new AfeFormControl();
        control3.uuid = 'c';
        control3.setValue(30);

        control.controlRelations.addRelatedControls(control2);
        control.controlRelations.addRelatedControls(control3);


        let expresion = 'sum(b, c)';

        let helper = {
            sum: (a, b) => {
                return a + b;
            }
        };
        let runnable: Runnable = runner.getRunnable(expresion, control, helper, {});
        expect(runnable.run()).toBe(50);

        // Case 2, helpers that reference other helpers

        expresion = 'sum(b, c)';
        let increment;
        let helper2 = {
            tenth: 2,
            sum: (a, b) => {
                return increment(a) + b;
            },
            increment: (n) => {
                return n + 1;
            }
        };
        increment = helper2.increment;

        runnable = runner.getRunnable(expresion, control, helper2, {});
        expect(runnable.run()).toBe(51);

    });

    it('should run js epxression wth data deps', () => {
        let runner: ExpressionRunner = TestBed.get(ExpressionRunner);
        let control = new AfeFormControl();
        control.uuid = 'a';
        let control2 = new AfeFormControl();
        control2.uuid = 'b';
        control2.setValue(20);
        let control3 = new AfeFormControl();
        control3.uuid = 'c';
        control3.setValue(30);

        control.controlRelations.addRelatedControls(control2);
        control.controlRelations.addRelatedControls(control3);


        let expresion = 'b + c + HD.first';

        let deps = {
            HD: {
                first: 1,
                second: {
                    second: 2,
                    compute: (t, l) => {
                        return t + l;
                    }
                },
                dummy: () => { }
            }
        };
        let runnable: Runnable = runner.getRunnable(expresion, control, {}, deps);
        expect(runnable.run()).toBe(51);

    });
});
