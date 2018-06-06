import { QuestionBase } from './question-base';
import { RepeatingQuestionOptions } from './interfaces/repeating-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

import { NestedQuestion } from './interfaces/nested-questions';

export class RepeatingQuestion extends NestedQuestion {
    questions: QuestionBase[];

    constructor(options: RepeatingQuestionOptions) {
        super(options);
        this.renderingType = 'repeating';
        this.questions = options.questions || [];
        this.controlType = AfeControlType.AfeFormArray;
    }
}
