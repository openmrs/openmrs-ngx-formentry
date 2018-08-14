import { TextQuestionOptions } from '../interfaces/text-question-options';
export interface TextAreaQuestionOptions extends TextQuestionOptions {
    isExpanded: boolean;
    rows: number;
}
