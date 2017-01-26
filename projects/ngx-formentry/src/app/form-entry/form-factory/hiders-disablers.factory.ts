import { Injectable } from '@angular/core';

import { Disabler } from '../control-hiders-disablers/can-disable';
import { Hider } from '../control-hiders-disablers/can-hide';

import { ExpressionRunner, Runnable } from '../expression-runner/expression-runner';
import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Form} from './form';

@Injectable()
export class HidersDisablersFactory {
    constructor(private expressionRunner: ExpressionRunner, private expressionHelper: JsExpressionHelper) {
    }

    getJsExpressionDisabler(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup,
        form?: Form): Disabler {
        let runnable: Runnable =
            this.expressionRunner.getRunnable(question.disable as string, control,
                this.expressionHelper.helperFunctions, {}, form);
        let disabler: Disabler = {
            toDisable: false,
            disableWhenExpression: question.disable as string,
            reEvaluateDisablingExpression: () => {
                let result = runnable.run();
                disabler.toDisable = result;
            }
        };
        return disabler;
    }

    getJsExpressionHider(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup,
        form?: Form): Hider {

        let hide: any = question.hide;
        let value: string = typeof hide === 'object' ? this.convertHideObjectToString(hide) : question.hide as string;

        let runnable: Runnable =
            this.expressionRunner.getRunnable(value, control,
                this.expressionHelper.helperFunctions, {}, form);
        let hider: Hider = {
            toHide: false,
            hideWhenExpression: value,
            reEvaluateHidingExpression: () => {
                let result = runnable.run();
                hider.toHide = result;
            }
        };
        return hider;
    }

    convertHideObjectToString(hide: any) {

      if (hide.value instanceof Array) {

        let arrayStr: string = "'" + hide.value.join("','") + "'";
        let exp = '!arrayContains([' + arrayStr + '],' + hide.field + ')';
        return exp;
      }

      return '';
    }
}
