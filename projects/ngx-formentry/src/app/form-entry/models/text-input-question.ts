import { QuestionBase } from './question-base';

import { ITextQuestionsOptions } from '../interfaces/text-question-options';
export class TextInputQuestion extends QuestionBase {

    placeholder: string;
    constructor(options: ITextQuestionsOptions) {

        super(options);
        this.placeholder = options.placeholder || '';

    }
}
