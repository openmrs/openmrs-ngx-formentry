import { BaseOptions } from '../interfaces/base-options';
import { QuestionBase } from '../question-base';
export interface GroupQuestionOptions extends BaseOptions {
    questions: QuestionBase[];
}
