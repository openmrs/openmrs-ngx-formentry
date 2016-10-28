import { QuestionBase } from './question-base';
import { ISelectQuestionOptions } from '../interfaces/select-question-options';

export class SelectQuestion extends QuestionBase {

    options: { key: string, value: string }[];

    constructor(options: ISelectQuestionOptions) {
        super(options);
        this.type = 'select';
        this.options = options.options || [];
    }

}
