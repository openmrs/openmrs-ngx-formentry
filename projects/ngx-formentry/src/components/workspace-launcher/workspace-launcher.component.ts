import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofe-workspace-launcher',
  templateUrl: './workspace-launcher.component.html'
})
export class WorkspaceLauncherComponent {
  @Input() public id: string;
  @Input() public buttonLabel: string;
  @Input() public workspaceName: string;

  public handleClick() {
    if (!window['_openmrs_esm_patient_common_lib']) {
      console.error(
        "@openmrs/esm-patient-common-lib is not accessible. The 'workspace-launcher' question type can only be used in the context of the O3 patient chart, where the workspace is."
      );
    } else if (
      typeof window['_openmrs_esm_patient_common_lib']
        .launchPatientWorkspace !== 'function'
    ) {
      console.error(
        '@openmrs/esm-patient-common-lib is accessible, but the `launchPatientWorkspace` function is missing. It is likely that the version of @openmrs/esm-patient-common-lib that is being used is not compatible with this version of ngx-formentry.'
      );
    } else {
      window['_openmrs_esm_patient_common_lib'].launchPatientWorkspace(
        this.workspaceName
      );
    }
  }
}
