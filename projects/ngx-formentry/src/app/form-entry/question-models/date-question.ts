import { QuestionBase } from './question-base';
import { IDateQuestionOptions } from '../interfaces/date-question-options';

export class DateQuestion extends QuestionBase {
    
    constructor(options: IDateQuestionOptions) {
        super(options);
        this.type = 'date';
    }
}
