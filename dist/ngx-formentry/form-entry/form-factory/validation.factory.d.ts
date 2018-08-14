import { Validators } from '@angular/forms';
import { ConditionalRequiredValidator } from '../validators/conditional-required.validator';
import { ConditionalAnsweredValidator } from '../validators/conditional-answered.validator';
import { JsExpressionValidator } from '../validators/js-expression.validator';
import { QuestionBase } from '../question-models/question-base';
export declare class ValidationFactory {
    constructor();
    getValidators(question: QuestionBase, form?: any): any[];
    readonly conditionalRequiredValidator: ConditionalRequiredValidator;
    readonly conditionalAnsweredValidator: ConditionalAnsweredValidator;
    readonly requiredValidator: any;
    readonly dateValidator: any;
    readonly futureDateRestrictionValidator: any;
    readonly maxDateValidator: any;
    readonly minDateValidator: any;
    readonly minLengthValidator: any;
    readonly maxLengthValidator: typeof Validators.maxLength;
    getMinValueValidator(min: number): any;
    getMaxValueValidator(max: number): any;
    readonly jsExpressionValidator: JsExpressionValidator;
    errors(errors: any, question: QuestionBase): Array<string>;
}
