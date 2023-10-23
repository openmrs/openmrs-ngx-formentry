import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { WorkspaceLauncherOptions } from './interfaces/workspace-launcher-options';

export class WorkspaceLauncherQuestion extends QuestionBase {
  buttonLabel: string;

  constructor(options: WorkspaceLauncherOptions) {
    console.log("constructing from ", options);
    super(options);
    this.renderingType = 'workspace-launcher';
    this.label = options.label || '';
    this.buttonLabel = options.buttonLabel || '';
    this.controlType = AfeControlType.AfeFormControl;
  }
}
