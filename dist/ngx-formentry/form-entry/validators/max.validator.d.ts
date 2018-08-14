import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
export declare class MaxValidator {
    validate(max: number): (control: AfeFormControl) => {
        [key: string]: any;
    };
}
