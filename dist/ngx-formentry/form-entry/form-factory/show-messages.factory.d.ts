import { Alert } from '../control-alerts/can-generate-alert';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Form } from './form';
export declare class AlertsFactory {
    private expressionRunner;
    private expressionHelper;
    constructor(expressionRunner: ExpressionRunner, expressionHelper: JsExpressionHelper);
    getJsExpressionshowAlert(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup, form?: Form): Alert;
}
