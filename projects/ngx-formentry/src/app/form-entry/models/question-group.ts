import { QuestionBase } from './question-base';
export class QuestionGroup extends QuestionBase<string> {
    questions: any[] = [];
    settings: any;
    constructor(options: QuestionGroup) {
        super(options);
        this.type = 'group';
        this.questions = options.questions || [];
    }
}
