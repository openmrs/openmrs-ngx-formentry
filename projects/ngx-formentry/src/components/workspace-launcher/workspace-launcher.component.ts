import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofe-workspace-launcher',
  templateUrl: './workspace-launcher.component.html'
})
export class WorkspaceLauncherComponent {
  @Input() public id: string;
  @Input() public buttonLabel: string;

  public handleClick() {
    if (!window['_openmrs_esm_patient_common_lib']) {
      console.error(
        "@openmrs/esm-patient-common-lib is not accessible. The 'workspace-launcher' question type can only be used in the context of the O3 patient chart, where the workspace is."
      );
    } else {
      window['_openmrs_esm_patient_common_lib'].launchPatientWorkspace(
        'add-drug-order'
      );
    }
  }
}
