import { Disabler } from '../control-hiders-disablers/can-disable';
import { Hider } from '../control-hiders-disablers/can-hide';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
import { Form } from './form';
import { DebugModeService } from './../services/debug-mode.service';
export declare class HidersDisablersFactory {
    private expressionRunner;
    private expressionHelper;
    private _debugModeService;
    constructor(expressionRunner: ExpressionRunner, expressionHelper: JsExpressionHelper, _debugModeService: DebugModeService);
    getJsExpressionDisabler(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup, form?: Form): Disabler;
    getJsExpressionHider(question: QuestionBase, control: AfeFormControl | AfeFormArray | AfeFormGroup, form?: Form): Hider;
    convertHideObjectToString(hide: any): string;
}
