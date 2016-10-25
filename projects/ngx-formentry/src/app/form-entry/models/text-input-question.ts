import { QuestionBase } from './question-base';

export class TextInputQuestion extends QuestionBase<any> {
    placeholder: string;
    constructor(options: TextInputQuestion) {
        super(options);
        this.placeholder = options.placeholder || '';

    }
}
