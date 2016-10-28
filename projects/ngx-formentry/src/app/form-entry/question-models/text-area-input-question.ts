import { TextInputQuestion } from "./text-input-question";
import { TextAreaQuestionOptions } from '../interfaces/text-area-question-options';

export class TextAreaInputQuestion extends TextInputQuestion {
    isExpanded: boolean;
    rows: number;
 
    constructor(options: TextAreaQuestionOptions) {

        super(options);
        this.placeholder = options.placeholder || '';
        this.isExpanded = options.isExpanded || false;
        this.rows = options.rows || 18;
        this.type='textarea';

    }
}
