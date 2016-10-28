import { QuestionBase } from './question-base';
import { ITextQuestionOptions } from '../interfaces/text-question-options';

export class TextInputQuestion extends QuestionBase {

    placeholder: string;
    constructor(options: ITextQuestionOptions) {

        super(options);
        this.placeholder = options.placeholder || '';

    }
}
