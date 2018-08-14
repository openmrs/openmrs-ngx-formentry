import { AfeFormControl } from '../../abstract-controls-extension/afe-form-control';
export declare class MinValidator {
    validate(min: number): (control: AfeFormControl) => {
        [key: string]: any;
    };
}
