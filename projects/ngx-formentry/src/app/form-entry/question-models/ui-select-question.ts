import { QuestionBase } from './question-base';
import { UiSelectQuestionOptions } from '../interfaces/ui-select-question-options';

export class UiSelectQuestion extends QuestionBase {

    options: { key: string, value: string }[];
    searchFunction: Function;
    resolveFunction: Function;
    constructor(options: UiSelectQuestionOptions) {
        super(options);
        this.type = 'ui-select';
        this.options = options.options || [];
    }

}
