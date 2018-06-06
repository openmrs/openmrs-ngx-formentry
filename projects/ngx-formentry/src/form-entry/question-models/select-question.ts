import { QuestionBase } from './question-base';
import { SelectQuestionOptions } from './interfaces/select-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class SelectQuestion extends QuestionBase {

    options: { key: string, value: string }[];
    dataSource?: any;

    constructor(options: SelectQuestionOptions) {
        super(options);
        this.renderingType = 'select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
        this.dataSource = options.dataSource || '';
    }

}
