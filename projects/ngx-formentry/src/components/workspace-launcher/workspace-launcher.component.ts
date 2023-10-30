import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofe-workspace-launcher',
  templateUrl: './workspace-launcher.component.html'
})
export class WorkspaceLauncherComponent {
  @Input() public id: string;
  @Input() public buttonLabel: string;
  @Input() public buttonType: string;
  @Input() public workspaceName: string;

  public handleClick() {
    // We check that this is defined in question.factory.ts `toWorkspaceLauncher`
    window['_openmrs_esm_patient_common_lib'].launchPatientWorkspace(
      this.workspaceName
    );
  }
}
