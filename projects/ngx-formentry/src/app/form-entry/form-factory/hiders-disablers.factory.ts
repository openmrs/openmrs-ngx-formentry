import { Injectable } from '@angular/core';

import { Disabler } from '../control-hiders-disablers/can-disable';
import { Hider } from '../control-hiders-disablers/can-hide';

import { ExpressionRunner, Runnable } from '../expression-runner/expression-runner';
import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionHelper } from '../helpers/js-expression-helper';

@Injectable()
export class HidersDisablersFactory {
    constructor(private expressionRunner: ExpressionRunner, private expressionHelper: JsExpressionHelper) {
    }

    getJsExpressionDisabler(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup,
        dataSource?: any): Disabler {
        let runnable: Runnable =
            this.expressionRunner.getRunnable(question.disable as string, control,
                this.expressionHelper.helperFunctions, dataSource);
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
        dataSource?: any): Hider {
        let runnable: Runnable =
            this.expressionRunner.getRunnable(question.hide as string, control,
                this.expressionHelper.helperFunctions, dataSource);
        let hider: Hider = {
            toHide: false,
            hideWhenExpression: question.hide as string,
            reEvaluateHidingExpression: () => {
                let result = runnable.run();
                hider.toHide = result;
            }
        };
        return hider;
    }
}
