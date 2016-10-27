import { QuestionBase } from './question-base';

export class QuestionGroup extends QuestionBase {
    questions: any[] = [];

    constructor(options: QuestionGroup) {
        super(options);
        this.type = 'group';
        this.questions = options.questions || [];
    }
}
