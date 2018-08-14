import { QuestionBase } from './question-base';
import { UiSelectQuestionOptions } from './interfaces/ui-select-question-options';
export declare class UiSelectQuestion extends QuestionBase {
    options: {
        key: string;
        value: string;
    }[];
    searchFunction: Function;
    resolveFunction: Function;
    constructor(options: UiSelectQuestionOptions);
}
