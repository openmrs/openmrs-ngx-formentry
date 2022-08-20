import { TestBed } from '@angular/core/testing';

import { Runnable, ExpressionRunner } from './expression-runner';
import { AfeFormControl } from '../../abstract-controls-extension';

describe('Control Hider Helper Service:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpressionRunner]
    });
  });

  it('should be defined', () => {
    const runner: ExpressionRunner = TestBed.inject(ExpressionRunner);
    expect(runner).toBeTruthy();
  });

  it('should run basic js expression wihtout references, data dependencies and helpers', () => {
    const runner: ExpressionRunner = TestBed.inject(ExpressionRunner);
    const control = new AfeFormControl();
    const expresion = '1===1';
    const runnable: Runnable = runner.getRunnable(expresion, control, {}, {});
    expect(runnable.run()).toBe(true);
  });

  it('should run js expression wth references', () => {
    const runner: ExpressionRunner = TestBed.inject(ExpressionRunner);
    const control = new AfeFormControl();
    control.uuid = 'a';
    const control2 = new AfeFormControl();
    control2.uuid = 'b';
    control2.setValue(20);
    const control3 = new AfeFormControl();
    control3.uuid = 'c';
    control3.setValue(30);

    control.controlRelations.addRelatedControls(control2);
    control.controlRelations.addRelatedControls(control3);

    const expresion = 'b + c';
    const runnable: Runnable = runner.getRunnable(expresion, control, {}, {});
    expect(runnable.run()).toBe(50);
  });

  it('should run js expression wth helper functions', () => {
    const runner: ExpressionRunner = TestBed.inject(ExpressionRunner);
    const control = new AfeFormControl();
    control.uuid = 'a';
    const control2 = new AfeFormControl();
    control2.uuid = 'b';
    control2.setValue(20);
    const control3 = new AfeFormControl();
    control3.uuid = 'c';
    control3.setValue(30);

    control.controlRelations.addRelatedControls(control2);
    control.controlRelations.addRelatedControls(control3);

    let expresion = 'sum(b, c)';

    const helper = {
      sum: (a, b) => {
        return a + b;
      }
    };
    let runnable: Runnable = runner.getRunnable(expresion, control, helper, {});
    expect(runnable.run()).toBe(50);

    // Case 2, helpers that reference other helpers

    expresion = 'sum(b, c)';
    let increment;
    const helper2 = {
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

  it('should run js expression wth data deps', () => {
    const runner: ExpressionRunner = TestBed.inject(ExpressionRunner);
    const control = new AfeFormControl();
    control.uuid = 'a';
    const control2 = new AfeFormControl();
    control2.uuid = 'b';
    control2.setValue(20);
    const control3 = new AfeFormControl();
    control3.uuid = 'c';
    control3.setValue(30);

    control.controlRelations.addRelatedControls(control2);
    control.controlRelations.addRelatedControls(control3);

    const expresion = 'b + c + HD.first';

    const deps = {
      HD: {
        first: 1,
        second: {
          second: 2,
          compute: (t, l) => {
            return t + l;
          }
        },
        dummy: () => {}
      }
    };
    const runnable: Runnable = runner.getRunnable(expresion, control, {}, deps);
    expect(runnable.run()).toBe(51);
  });
});
