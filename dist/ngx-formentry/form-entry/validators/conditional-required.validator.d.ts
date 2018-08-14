import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
export declare class ConditionalRequiredValidator {
    constructor();
    validate(model: ConditionalValidationModel): (control: AfeFormControl) => {
        [key: string]: any;
    };
}
