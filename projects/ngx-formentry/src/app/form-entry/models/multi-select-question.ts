import { QuestionBase } from './question-base';

export class MultiSelectQuestion extends QuestionBase<String> {
    options: {key: string, value: string}[] = [];
    constructor(options: MultiSelectQuestion) {
        super(options);
        this.type = 'multi-select';
    }

}