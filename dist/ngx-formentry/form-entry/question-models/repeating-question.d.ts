import { QuestionBase } from './question-base';
import { RepeatingQuestionOptions } from './interfaces/repeating-question-options';
import { NestedQuestion } from './interfaces/nested-questions';
export declare class RepeatingQuestion extends NestedQuestion {
    questions: QuestionBase[];
    constructor(options: RepeatingQuestionOptions);
}
