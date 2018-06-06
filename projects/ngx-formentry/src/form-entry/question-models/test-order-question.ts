import { QuestionBase } from './question-base';
import { TestOrderQuestionOptions } from './interfaces/test-order-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class TestOrderQuestion extends QuestionBase {
    orderType: string;
    selectableOrders: { concept: string, label: string }[];
    orderSettingUuid: string;
    rendering: string;
    options: any[];
    constructor(options: TestOrderQuestionOptions) {
        super(options);
        this.renderingType = 'select';
        this.orderType = options.orderType;
        this.selectableOrders = options.selectableOrders;
        this.options = options.options;
        this.orderSettingUuid = options.orderSettingUuid;
        this.rendering = options.orderSettingUuid;
        this.controlType = AfeControlType.AfeFormControl;
    }
}
