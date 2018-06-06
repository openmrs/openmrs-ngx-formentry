import { QuestionBase } from './question-base';
import { TextQuestionOptions } from './interfaces/text-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class TextInputQuestion extends QuestionBase {

    placeholder: string;
    constructor(options: TextQuestionOptions) {

        super(options);
        this.placeholder = options.placeholder || '';
        this.controlType = AfeControlType.AfeFormControl;
    }
}
