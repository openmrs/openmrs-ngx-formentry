import { QuestionBase } from './question-base';
import { IRepeatingQuestionOptions } from '../interfaces/repeating-question-options';
export class RepeatingQuestion extends QuestionBase {
    questions: QuestionBase[];

    constructor(options: IRepeatingQuestionOptions) {
        super(options);
        this.type = 'repeating';
        this.questions = options.questions || [];
    }
}
