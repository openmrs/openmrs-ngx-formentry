import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
export declare class ConditionalAnsweredValidator {
    constructor();
    validate(model: ConditionalValidationModel): (control: AfeFormControl) => {
        [key: string]: any;
    };
}
