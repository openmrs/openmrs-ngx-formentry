import { QuestionBase } from './question-base';
import { CheckboxOptions } from './interfaces/checkbox-options';
export declare class CheckBoxQuestion extends QuestionBase {
    options: {
        key: string;
        value: string;
    }[];
    constructor(options: CheckboxOptions);
}
