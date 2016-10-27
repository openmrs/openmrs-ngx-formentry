import { QuestionBase } from './question-base';

export class SelectQuestion extends QuestionBase {

    options: { key: string, value: string }[] = [];

    constructor(options: SelectQuestion) {
        super(options);
        this.type = 'select';
    }

}
