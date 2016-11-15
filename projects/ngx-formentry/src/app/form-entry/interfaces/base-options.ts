import { ValidationModel } from '../models/validation.model';

export interface BaseOptions {
    value?: any;
    type: string;
    key: string;
    label?: string;
    order?: number;
    validators?: Array<ValidationModel>;
    required?: boolean;
    default?: string;
    questionOptions?: any;
}
