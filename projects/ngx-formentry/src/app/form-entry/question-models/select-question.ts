import { QuestionBase } from './question-base';
import { SelectQuestionOptions } from '../interfaces/select-question-options';

export class SelectQuestion extends QuestionBase {

    options: { key: string, value: string }[];

    constructor(options: SelectQuestionOptions) {
        super(options);
        this.type = 'select';
        this.options = options.options || [];
    }

}
