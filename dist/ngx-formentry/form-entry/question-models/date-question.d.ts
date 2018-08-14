import { QuestionBase } from './question-base';
import { DateQuestionOptions } from './interfaces/date-question-options';
export declare class DateQuestion extends QuestionBase {
    showTime: boolean;
    showWeeksAdder: boolean;
    constructor(options: DateQuestionOptions);
}
