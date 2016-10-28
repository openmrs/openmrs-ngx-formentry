import { QuestionBase } from './question-base';
import { TextQuestionOptions } from '../interfaces/text-question-options';

export class TextInputQuestion extends QuestionBase {

    placeholder: string;
    constructor(options: TextQuestionOptions) {

        super(options);
        this.placeholder = options.placeholder || '';

    }
}
