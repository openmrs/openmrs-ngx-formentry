import { QuestionBase } from './question-base';
import { SelectQuestionOptions } from './interfaces/select-question-options';
export declare class SelectQuestion extends QuestionBase {
    options: {
        key: string;
        value: string;
    }[];
    dataSource?: any;
    constructor(options: SelectQuestionOptions);
}
