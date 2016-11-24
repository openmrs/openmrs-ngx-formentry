import { QuestionBase } from './question-base';
import { GroupQuestionOptions } from './interfaces/group-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

import { NestedQuestion } from './interfaces/nested-questions';

export class QuestionGroup extends NestedQuestion {
    questions: QuestionBase[];

    constructor(options: GroupQuestionOptions) {
        super(options);
        this.renderingType = 'group';
        this.questions = options.questions || [];
        this.controlType = AfeControlType.AfeFormGroup;
    }
}
