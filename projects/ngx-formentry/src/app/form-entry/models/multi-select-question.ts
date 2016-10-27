import { QuestionBase } from './question-base';

export class MultiSelectQuestion extends QuestionBase {
    options: { key: string, value: string }[] = [];
    constructor(options: MultiSelectQuestion) {
        super(options);
        this.type = 'multi-select';
        this.options = options.options || [];
    }

}
