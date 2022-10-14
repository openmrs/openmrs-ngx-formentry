import { QuestionBase } from './question-base';
import { RadioButtonOptions } from './interfaces/radio-button-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class RadioButtonQuestion extends QuestionBase {
  options: { key: string; value: string }[];

  constructor(options: RadioButtonOptions) {
    super(options);
    this.renderingType = 'radio';
    this.allowRadioUnselect = options.allowRadioUnselect === false;
    this.options = options.options || [];
    this.controlType = AfeControlType.AfeFormControl;
  }
}
