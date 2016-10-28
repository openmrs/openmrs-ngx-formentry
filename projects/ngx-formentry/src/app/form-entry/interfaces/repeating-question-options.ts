import { BaseOptions } from '../interfaces/base-options';

export interface RepeatingQuestionOptions extends BaseOptions {
    questions: BaseOptions[];
}