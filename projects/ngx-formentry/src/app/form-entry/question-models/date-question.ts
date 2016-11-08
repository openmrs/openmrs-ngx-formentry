import { QuestionBase } from './question-base';
import { DateQuestionOptions } from '../interfaces/date-question-options';

export class DateQuestion extends QuestionBase {
    constructor(options: DateQuestionOptions) {
        super(options);
        this.type = 'date';
    }
}
