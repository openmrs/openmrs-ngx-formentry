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

  public handleClick() {
    // We check that this is defined in question.factory.ts `toWorkspaceLauncher`
    window['_openmrs_esm_framework'].launchWorkspace(
      this.workspaceName,
      this.additionalProps ?? {}
    );
  }
}
