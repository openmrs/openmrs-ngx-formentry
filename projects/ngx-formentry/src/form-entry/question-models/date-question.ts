import { QuestionBase } from './question-base';
import { DateQuestionOptions } from './interfaces/date-question-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class DateQuestion extends QuestionBase {
  showTime = true;
  showWeeksAdder = false;
  dataSource?: string;
  constructor(options: DateQuestionOptions) {
    super(options);
    this.renderingType = 'date';
    this.controlType = AfeControlType.AfeFormControl;
  }
}
