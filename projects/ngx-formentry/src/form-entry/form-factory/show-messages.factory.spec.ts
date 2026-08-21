import { TestBed } from '@angular/core/testing';

import { Alert } from '../control-alerts/can-generate-alert';
import { AlertsFactory } from './show-messages.factory';
import { QuestionBase } from '../question-models/question-base';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import {
  AfeFormArray,
  AfeFormControl
} from '../../abstract-controls-extension';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { TranslateModule } from '@ngx-translate/core';

describe('Show Messages Factory:', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [AlertsFactory, ExpressionRunner, JsExpressionHelper]
    });
  });

  it('should be injected', () => {
    const factory: AlertsFactory = TestBed.inject(AlertsFactory);
    expect(factory).toBeTruthy();
  });

  it('should return a message when the alertWhenExpression returns true', () => {
    const factory: AlertsFactory = TestBed.inject(AlertsFactory);

    let model: QuestionBase = new QuestionBase({
      type: 'testOrder',
      key: 'control1',
      alert: {
        alertWhenExpression: 'true',
        message: 'Vl required'
      }
    });
    const control2: AfeFormControl = new AfeFormControl();
    control2.uuid = 'control2';
    control2.setValue('hello');

    const control: AfeFormArray = new AfeFormArray([control2]);

    control.uuid = 'control1';
    const message: Alert = factory.getJsExpressionshowAlert(model, control);
    control.setAlertFn(message);
    control.updateAlert();
    expect(control.alert).toEqual('Vl required');
  });

  it('should return an empty message when the alertWhenExpression returns false', () => {
    const factory: AlertsFactory = TestBed.inject(AlertsFactory);

    let model: QuestionBase = new QuestionBase({
      type: 'testOrder',
      key: 'control1',
      alert: {
        alertWhenExpression: 'false',
        message: 'Vl required'
      }
    });
    const control2: AfeFormControl = new AfeFormControl();
    control2.uuid = 'control2';
    control2.setValue('');

    const control: AfeFormArray = new AfeFormArray([control2]);

    control.uuid = 'control1';
    const message: Alert = factory.getJsExpressionshowAlert(model, control);
    control.setAlertFn(message);
    control.updateAlert();
    expect(control.alert).toEqual('');
  });

  it('should show the first matching message when multiple alerts are defined', () => {
    const factory: AlertsFactory = TestBed.inject(AlertsFactory);

    const model: QuestionBase = new QuestionBase({
      type: 'obs',
      key: 'temperature',
      alert: [
        {
          alertWhenExpression: 'myValue >= 50',
          message: 'Very High'
        },
        {
          alertWhenExpression: 'myValue >= 40',
          message: 'High'
        }
      ]
    });

    const control = new AfeFormControl(55);
    control.uuid = 'temperature';

    factory.getJsExpressionAlerts(model, control).forEach((alert) => {
      control.setAlertFn(alert);
    });
    control.updateAlert();

    expect(control.alert).toEqual('Very High');
  });

  it('should fall through to the next alert when earlier conditions do not match', () => {
    const factory: AlertsFactory = TestBed.inject(AlertsFactory);

    const model: QuestionBase = new QuestionBase({
      type: 'obs',
      key: 'temperature',
      alert: [
        {
          alertWhenExpression: 'myValue >= 50',
          message: 'Very High'
        },
        {
          alertWhenExpression: 'myValue >= 40',
          message: 'High'
        }
      ]
    });

    const control = new AfeFormControl(45);
    control.uuid = 'temperature';

    factory.getJsExpressionAlerts(model, control).forEach((alert) => {
      control.setAlertFn(alert);
    });
    control.updateAlert();

    expect(control.alert).toEqual('High');
  });

  it('should return an empty alert when no condition matches', () => {
    const factory: AlertsFactory = TestBed.inject(AlertsFactory);

    const model: QuestionBase = new QuestionBase({
      type: 'obs',
      key: 'temperature',
      alert: [
        { alertWhenExpression: 'myValue >= 50', message: 'Very High' },
        { alertWhenExpression: 'myValue >= 40', message: 'High' }
      ]
    });

    const control = new AfeFormControl(30);
    control.uuid = 'temperature';

    factory.getJsExpressionAlerts(model, control).forEach((alert) => {
      control.setAlertFn(alert);
    });
    control.updateAlert();

    expect(control.alert).toEqual('');
  });

  it('should handle a single object alert config without an array', () => {
    const factory: AlertsFactory = TestBed.inject(AlertsFactory);

    const model: QuestionBase = new QuestionBase({
      type: 'obs',
      key: 'temperature',
      alert: { alertWhenExpression: 'true', message: 'Single alert' }
    });

    const control = new AfeFormControl(55);
    control.uuid = 'temperature';

    factory.getJsExpressionAlerts(model, control).forEach((alert) => {
      control.setAlertFn(alert);
    });
    control.updateAlert();

    expect(control.alert).toEqual('Single alert');
  });

  it('should return an empty alert and not throw when alert is an empty array', () => {
    const factory: AlertsFactory = TestBed.inject(AlertsFactory);

    const model: QuestionBase = new QuestionBase({
      type: 'obs',
      key: 'temperature',
      alert: []
    });

    const control = new AfeFormControl(55);
    control.uuid = 'temperature';

    expect(() => {
      factory.getJsExpressionAlerts(model, control).forEach((alert) => {
        control.setAlertFn(alert);
      });
      control.updateAlert();
    }).not.toThrow();

    expect(control.alert).toEqual('');
  });
});
