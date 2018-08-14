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
    alert?: any;
    disable?: string | boolean;
    enableHistoricalValue?: boolean;
    historicalDataValue?: any;
    calculateExpression?: string;
    questions?: any;
    placeholder?: any;
    hidden?: any;
    showTime?: any;
    showWeek?: any;
    historicalDisplay?: any;
    rows?: any;
    showWeeksAdder?: any;
}
