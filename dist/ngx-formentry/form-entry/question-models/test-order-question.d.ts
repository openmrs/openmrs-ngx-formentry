import { QuestionBase } from './question-base';
import { TestOrderQuestionOptions } from './interfaces/test-order-question-options';
export declare class TestOrderQuestion extends QuestionBase {
    orderType: string;
    selectableOrders: {
        concept: string;
        label: string;
    }[];
    orderSettingUuid: string;
    rendering: string;
    options: any[];
    constructor(options: TestOrderQuestionOptions);
}
