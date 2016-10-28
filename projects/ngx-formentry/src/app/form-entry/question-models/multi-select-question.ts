import { SelectQuestion } from './select-question';
import { IMultiSelectQuestionOptions } from '../interfaces/multi-select-options';

export class MultiSelectQuestion extends SelectQuestion {

    options: { key: string, value: string }[];

    constructor(options: IMultiSelectQuestionOptions) {
        super(options);
        this.type = 'multi-select';
        this.options = options.options || [];
    }

}
