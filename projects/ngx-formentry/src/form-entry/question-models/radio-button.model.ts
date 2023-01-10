import { QuestionBase } from './question-base';
import { RadioButtonOptions } from './interfaces/radio-button-options';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';

export class RadioButtonQuestion extends QuestionBase {
  options: RadioButtonOptions['options'];
  allowUnselect: boolean;

  constructor(options: RadioButtonOptions) {
    super(options);
    this.renderingType = 'radio';
    this.allowUnselect = options.allowUnselect === true;
    this.options = options.options || [];
    this.controlType = AfeControlType.AfeFormControl;
  }
}
