import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { WorkspaceLauncherOptions } from './interfaces/workspace-launcher-options';

export class WorkspaceLauncherQuestion extends QuestionBase {
  buttonLabel: string;
  workspaceName: string;

  constructor(options: WorkspaceLauncherOptions) {
    super(options);
    this.renderingType = 'workspace-launcher';
    this.label = options.label || '';
    this.buttonLabel = options.buttonLabel || '';
    this.workspaceName = options.workspaceName || 'order-basket';
    this.controlType = AfeControlType.AfeFormControl;
  }
}
