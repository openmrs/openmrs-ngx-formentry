import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { BaseOptions } from './interfaces/base-options';

export class CustomControlQuestion extends QuestionBase {
  placeholder: string;
  constructor(options: BaseOptions) {
    super(options);
    this.placeholder = options.placeholder || '';
    this.controlType = AfeControlType.AfeFormControl;
  }
}
