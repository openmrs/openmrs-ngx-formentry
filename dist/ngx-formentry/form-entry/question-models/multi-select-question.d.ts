import { SelectQuestion } from './select-question';
import { MultiSelectQuestionOptions } from './interfaces/multi-select-options';
export declare class MultiSelectQuestion extends SelectQuestion {
    options: {
        key: string;
        value: string;
    }[];
    constructor(options: MultiSelectQuestionOptions);
}
