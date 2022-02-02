import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { CustomControlOptions } from './interfaces/custom-control-options';

export class CustomControlQuestion extends QuestionBase {
  placeholder: string;
  constructor(options: CustomControlOptions) {
    super(options);
    this.placeholder = options.placeholder || '';
    this.controlType = AfeControlType.AfeFormControl;
  }
}