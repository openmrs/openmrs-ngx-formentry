import { QuestionBase } from './question-base';
import { CheckboxOptions } from './interfaces/checkbox-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class CheckBoxQuestion extends QuestionBase {
  options: { key: string; value: string }[];

  constructor(options: CheckboxOptions) {
    super(options);
    this.renderingType = 'checkbox';
    this.options = options.options || [];
    this.controlType = AfeControlType.AfeFormControl;
  }
}
