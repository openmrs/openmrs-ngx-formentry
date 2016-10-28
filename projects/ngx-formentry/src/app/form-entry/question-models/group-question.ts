import { QuestionBase } from './question-base';
import { GroupQuestionOptions } from '../interfaces/group-question-options';

export class QuestionGroup extends QuestionBase {
    questions: QuestionBase[];

    constructor(options: GroupQuestionOptions) {
        super(options);
        this.type = 'group';
        this.questions = options.questions || [];
    }
}
