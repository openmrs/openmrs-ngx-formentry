import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { WorkspaceLauncherOptions } from './interfaces/workspace-launcher-options';

export class WorkspaceLauncherQuestion extends QuestionBase {
  buttonLabel: string;
  buttonType: string;
  workspaceName: string;
  additionalProps: Record<string, unknown>;

  constructor(options: WorkspaceLauncherOptions) {
    super(options);
    this.renderingType = 'workspace-launcher';
    this.label = options.label || '';
    this.buttonLabel = options.buttonLabel || '';
    this.buttonType = options.buttonType || 'primary';
    this.workspaceName = options.workspaceName || 'order-basket';
    this.additionalProps = options.additionalProps || {};
    this.controlType = AfeControlType.AfeFormControl;
  }
}
