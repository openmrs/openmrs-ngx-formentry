import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { ModalLauncherOptions } from './interfaces/modal-launcher-options';

export class ModalLauncherQuestion extends QuestionBase {
  buttonLabel: string;
  buttonType: string;
  modalName: string;
  additionalProps: Record<string, unknown>;

  constructor(options: ModalLauncherOptions) {
    super(options);
    this.renderingType = 'modal-launcher';
    this.label = options.label || '';
    this.buttonLabel = options.buttonLabel || '';
    this.buttonType = options.buttonType || 'primary';
    this.modalName = options.modalName || '';
    this.additionalProps = options.additionalProps || {};
    this.controlType = AfeControlType.AfeFormControl;
  }
}
