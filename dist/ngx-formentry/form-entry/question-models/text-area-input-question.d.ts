import { TextInputQuestion } from './text-input-question';
import { TextAreaQuestionOptions } from './interfaces/text-area-question-options';
export declare class TextAreaInputQuestion extends TextInputQuestion {
    isExpanded: boolean;
    rows: number;
    constructor(options: TextAreaQuestionOptions);
}
