import { QuestionBase } from './question-base';
import { GroupQuestionOptions } from './interfaces/group-question-options';
import { NestedQuestion } from './interfaces/nested-questions';
export declare class QuestionGroup extends NestedQuestion {
    questions: QuestionBase[];
    isExpanded: boolean;
    constructor(options: GroupQuestionOptions);
}
