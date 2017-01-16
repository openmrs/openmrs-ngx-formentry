import { ValidationModel } from '../validation.model';

export interface BaseOptions {
    defaultValue?: any;
    originalValue?: any;
    type: string;
    key: string;
    label?: string;
    order?: number;
    extras?: any;
    validators?: Array<ValidationModel>;
    required?: boolean;
    questionOptions?: any;
    hide?: string | boolean;
    disable?: string | boolean;
    enableHistoricalValue?: boolean;
    historicalDataValue?: any;
    calculateExpression?: string;
}
