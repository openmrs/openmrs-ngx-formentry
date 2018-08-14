import { QuestionBase } from '../question-base';
import { BaseOptions } from '../interfaces/base-options';
export interface RepeatingQuestionOptions extends BaseOptions {
    questions: QuestionBase[];
}
