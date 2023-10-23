import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { BaseOptions } from './interfaces/base-options';

export class WorkspaceLauncherQuestion extends QuestionBase {
  buttonLabel: string;
  constructor(options: BaseOptions) {
    super(options);
    this.renderingType = 'workspace-launcher';
    this.placeholder = options.placeholder || '';
    this.controlType = AfeControlType.AfeFormControl;
  }
}
