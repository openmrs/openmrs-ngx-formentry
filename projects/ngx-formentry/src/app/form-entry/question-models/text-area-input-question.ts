import { TextInputQuestion } from './text-input-question';
import { TextAreaQuestionOptions } from './interfaces/text-area-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class TextAreaInputQuestion extends TextInputQuestion {
    isExpanded: boolean;
    rows: number;

    constructor(options: TextAreaQuestionOptions) {

        super(options);
        this.placeholder = options.placeholder || '';
        this.isExpanded = options.isExpanded || false;
        this.rows = options.rows || 18;
        this.renderingType = 'textarea';
        this.controlType = AfeControlType.AfeFormControl;
    }
}
