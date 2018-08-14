import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
export declare class JsExpressionValidator {
    constructor();
    validate(model: JsExpressionValidationModel, form?: any): (control: AfeFormControl) => {
        [key: string]: any;
    };
}
