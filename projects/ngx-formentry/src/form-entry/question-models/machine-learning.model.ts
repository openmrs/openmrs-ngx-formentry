import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { BaseOptions } from './models';

export class MachineLearningQuestion extends QuestionBase {
  constructor(options: BaseOptions) {
    super(options);
    this.renderingType = 'machine-learning';
    this.label = options.label || '';
    this.controlType = AfeControlType.AfeFormControl;
  }
}
