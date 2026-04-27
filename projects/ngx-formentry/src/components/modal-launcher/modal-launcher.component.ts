import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type NodeBase } from '../../form-entry/form-factory/form-node';

@Component({
  selector: 'ofe-modal-launcher',
  templateUrl: './modal-launcher.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ModalLauncherComponent {
  @Input() public id: string;
  @Input() public buttonLabel: string;
  @Input() public buttonType: string;
  @Input() public modalName: string;
  @Input() public additionalProps: Record<string, unknown>;
  @Input() public node: NodeBase;

  public handleClick() {
    const esmFramework = window['_openmrs_esm_framework'];
    const valueProcessingInfo = this.node.form.valueProcessingInfo;
    const formEntryState = valueProcessingInfo.formEntryState;
    console.log('formEntryState',formEntryState)
    const modalProps = {
      formEntryProps: formEntryState,
      ...this.additionalProps ?? {},
      formUuid: this.additionalProps?.formUuid,
    }

    if (esmFramework && typeof esmFramework.showModal === 'function') {
      const dispose =esmFramework.showModal(this.modalName, {...modalProps, closeModal: () => dispose()});
    } else {
      // Fail silently in production; details are logged by the QuestionFactory checks
      // if used there. This is just a safeguard when used directly.
      // eslint-disable-next-line no-console
      console.error(
        "@openmrs/esm-framework's `showModal` function is not available. The 'modal-launcher' component can only be used in an O3 context where modals are registered."
      );
    }
  }
}
