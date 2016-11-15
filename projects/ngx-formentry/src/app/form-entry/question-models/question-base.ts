import { BaseOptions } from '../interfaces/base-options';
import { ValidationModel } from '../models/validation.model';

export class QuestionBase {
    value?: any;
    type: string;
    key: string;
    label?: string;
    validators?: Array<ValidationModel>;
    required?: boolean;

    constructor(options: BaseOptions) {

        this.value = options.value;
        this.type = options.type;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.required = options.required;
    }
}
