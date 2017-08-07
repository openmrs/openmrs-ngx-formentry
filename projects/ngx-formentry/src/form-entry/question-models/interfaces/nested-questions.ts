import { QuestionBase } from '../question-base';
import { BaseOptions } from './base-options';

export abstract class NestedQuestion extends QuestionBase {
    abstract questions: QuestionBase[];
    constructor(options: BaseOptions) {
        super(options);
    }
}
