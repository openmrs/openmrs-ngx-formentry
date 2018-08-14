import { BaseOptions } from '../interfaces/base-options';
export interface TestOrderQuestionOptions extends BaseOptions {
    orderType: string;
    selectableOrders: {
        concept: string;
        label: string;
    }[];
    orderSettingUuid: string;
    rendering: string;
    options?: {
        key: string;
        value: string;
    }[];
}
