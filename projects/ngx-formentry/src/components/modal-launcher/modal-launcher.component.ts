import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  public handleClick() {
    const esmFramework = window['_openmrs_esm_framework'];

    if (esmFramework && typeof esmFramework.showModal === 'function') {
      esmFramework.showModal(
        this.modalName,
        this.additionalProps ?? {}
      );
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
