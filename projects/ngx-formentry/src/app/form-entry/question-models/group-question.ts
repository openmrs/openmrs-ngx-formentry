import { QuestionBase } from './question-base';
import { IGroupQuestionOptions } from '../interfaces/group-question-options';

export class QuestionGroup extends QuestionBase {
    questions: QuestionBase[];

    constructor(options: IGroupQuestionOptions) {
        super(options);
        this.type = 'group';
        this.questions = options.questions || [];
    }
}
