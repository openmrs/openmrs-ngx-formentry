import { BaseOptions } from './interfaces/base-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { ValidationModel } from './validation.model';

export class QuestionBase implements BaseOptions {
    type: string;
    order?: number;
    questionOptions?: any;
    questions?: any;
    placeholder?: any;
    hidden?: any;
    showTime?: any;
    showWeek?: any;
    historicalDisplay?: any;
    rows?: any;
    showWeeksAdder?: any;
    key: string;    alert?: any;

    label?: string;
    renderingType: string;

    defaultValue?: any;
    originalValue?: any;
    enableHistoricalValue?: boolean;
    showHistoricalValueDate?: boolean;
    historicalDataValue?: any;
    extras?: any;
    dataSource?: string;
    dataSourceOptions?: any;

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
        this.alert = options.alert;
        this.historicalDataValue = options.historicalDataValue;
        this.calculateExpression = options.calculateExpression;
    }

    setHistoricalValue(v: boolean) {
        this.enableHistoricalValue = v;
    }
    showHistoricalEncounterDate(v?: boolean) {
      this.showHistoricalValueDate = v === undefined ? true : v;
    }
}
