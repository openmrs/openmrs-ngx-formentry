import { BaseOptions } from './interfaces/base-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { ValidationModel } from './validation.model';

export class QuestionBase {
    key: string;
    label?: string;
    renderingType: string;

    defaultValue?: any;
    originalValue?: any;
    historicalDataValue?: any;
    extras?: any;

    controlType?: AfeControlType;
    validators?: Array<ValidationModel>;
    required?: boolean;
    hide?: string | boolean;
    disable?: string | boolean;
    calculateExpression?: string;
    options?: any;

    constructor(options: BaseOptions) {

        this.defaultValue = options.defaultValue;
        this.originalValue = options.originalValue;
        this.extras = options.extras;
        this.renderingType = options.type;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators || [];
        this.required = options.required;
        this.hide = options.hide;
        this.disable = options.disable;
        this.calculateExpression = options.calculateExpression;
    }
}
