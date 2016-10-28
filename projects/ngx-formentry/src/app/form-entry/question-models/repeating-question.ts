import { QuestionBase } from './question-base';
import { RepeatingQuestionOptions } from '../interfaces/repeating-question-options';
export class RepeatingQuestion extends QuestionBase {
    questions: QuestionBase[];

    constructor(options: RepeatingQuestionOptions) {
        super(options);
        this.type = 'repeating';
        this.questions = options.questions || [];
    }
}
