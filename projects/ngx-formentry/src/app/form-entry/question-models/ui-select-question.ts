import { QuestionBase } from './question-base';
import { UiSelectQuestionOptions } from './interfaces/ui-select-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class UiSelectQuestion extends QuestionBase {

    options: { key: string, value: string }[];
    searchFunction: Function;
    resolveFunction: Function;
    constructor(options: UiSelectQuestionOptions) {
        super(options);
        this.renderingType = 'ui-select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }

}
