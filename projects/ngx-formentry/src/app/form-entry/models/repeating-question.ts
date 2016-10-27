import { QuestionBase } from './question-base';

export class RepeatingQuestion extends QuestionBase {
    questions: QuestionBase[];

    constructor(options: RepeatingQuestion) {
        super(options);
        this.type = 'repeating';
        this.questions = options.questions || [];
    }
}
