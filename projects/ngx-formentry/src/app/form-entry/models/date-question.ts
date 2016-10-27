import { QuestionBase } from './question-base';

export class DateQuestion extends QuestionBase {
    constructor(options: DateQuestion) {
        super(options);
        this.type = 'date';
    }
}
