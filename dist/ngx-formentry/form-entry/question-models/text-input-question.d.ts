import { QuestionBase } from './question-base';
import { TextQuestionOptions } from './interfaces/text-question-options';
export declare class TextInputQuestion extends QuestionBase {
    placeholder: string;
    constructor(options: TextQuestionOptions);
}
