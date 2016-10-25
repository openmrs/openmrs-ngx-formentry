import { QuestionBase } from './question-base';

export class DateQuestion extends QuestionBase<any> {
    constructor(options: DateQuestion) {
        super(options);
        this.type =  'date';
    }
}