import { SelectQuestion } from './select-question';
import { MultiSelectQuestionOptions } from './interfaces/multi-select-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class MultiSelectQuestion extends SelectQuestion {

    options: { key: string, value: string }[];

    constructor(options: MultiSelectQuestionOptions) {
        super(options);
        this.renderingType = 'multi-select'  || 'single-select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }

}
