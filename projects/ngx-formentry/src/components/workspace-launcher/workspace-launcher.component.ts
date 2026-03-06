import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofe-workspace-launcher',
  templateUrl: './workspace-launcher.component.html',
  standalone: false
})
export class WorkspaceLauncherComponent {
  @Input() public id: string;
  @Input() public buttonLabel: string;
  @Input() public buttonType: string;
  @Input() public workspaceName: string;
  @Input() public additionalProps: Record<string, unknown>;
  @Input() public node: any;

  public handleClick() {
    // We check that this is defined in question.factory.ts `toWorkspaceLauncher`
    const isWorkspaceNameValid = !!this.workspaceName;
    if (!isWorkspaceNameValid) {
      console.error('Invalid workspace name.');
      return;
    }

    const workspaceProps = this.additionalProps ?? {};

    const info = this.node?.form?.valueProcessingInfo ?? {};
    const windowProps = {
      patient: info.patient,
      patientUuid: info.patientUuid,
      visitContext: info.visit,
      visitUuid: info.visitUuid
    };

    window['_openmrs_esm_framework'].launchWorkspace2(
      this.workspaceName,
      workspaceProps,
      windowProps
    );
  }
}
