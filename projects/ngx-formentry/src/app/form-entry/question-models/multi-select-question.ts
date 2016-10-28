import { SelectQuestion } from './select-question';
import { MultiSelectQuestionOptions } from '../interfaces/multi-select-options';

export class MultiSelectQuestion extends SelectQuestion {

    options: { key: string, value: string }[];

    constructor(options: MultiSelectQuestionOptions) {
        super(options);
        this.type = 'multi-select';
        this.options = options.options || [];
    }

}
