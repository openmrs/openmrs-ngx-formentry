import { QuestionBase } from './question-base';

export class RepeatingQuestion extends QuestionBase<string> {
    questions: QuestionBase<any>[];
    settings: any;
    constructor(options: RepeatingQuestion) {
        super(options);
        this.type = 'repeating';
        this.questions = options.questions || [];
        this.settings = options.settings || {};
    }
}
