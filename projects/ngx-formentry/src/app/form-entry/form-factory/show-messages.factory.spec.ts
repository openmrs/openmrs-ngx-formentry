import { TestBed } from '@angular/core/testing';

import { Alert } from '../control-alerts/can-generate-alert';
import { AlertsFactory } from './show-messages.factory';
import { QuestionBase } from '../question-models/question-base';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormArray , AfeFormControl } from '../../abstract-controls-extension/control-extensions';
import { JsExpressionHelper } from '../helpers/js-expression-helper';

describe('Show Messages Factory:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AlertsFactory,
                ExpressionRunner,
                JsExpressionHelper
            ]
        });
    });

    it('should be injected', () => {
        let factory: AlertsFactory = TestBed.get(AlertsFactory);
        expect(factory).toBeTruthy();
    });

    it('should return a message when the alertWhenExpression returns true', () => {
        let factory: AlertsFactory = TestBed.get(AlertsFactory);

        /* tslint:disable */
        let model: QuestionBase = new QuestionBase({
            type: 'testOrder',
            key: 'control1',
            alert: {
                alertWhenExpression: "true",
                message:'Vl required'
            }
        });
        /* tslint:enable */
        let control2: AfeFormControl = new AfeFormControl();
        control2.uuid = 'control2';
        control2.setValue('hello');

        let control: AfeFormArray = new AfeFormArray([control2]);

        control.uuid = 'control1';
        let message: Alert = factory.getJsExpressionshowAlert(model, control);
        control.setAlertFn(message);
        control.updateAlert();
        console.log(control.alert);
        console.log(control.alerts);
        expect(control.alert).toEqual('Vl required');
    });


    it('should return an empty message when the alertWhenExpression returns false', () => {
        let factory: AlertsFactory = TestBed.get(AlertsFactory);

        /* tslint:disable */
        let model: QuestionBase = new QuestionBase({
            type: 'testOrder',
            key: 'control1',
            alert: {
                alertWhenExpression: "false",
                message:'Vl required'
            }
        });
        /* tslint:enable */
        let control2: AfeFormControl = new AfeFormControl();
        control2.uuid = 'control2';
        control2.setValue('');

        let control: AfeFormArray = new AfeFormArray([control2]);

        control.uuid = 'control1';
        let message: Alert = factory.getJsExpressionshowAlert(model, control);
        control.setAlertFn(message);
        control.updateAlert();
        expect(control.alert).toEqual('');
    });
});
