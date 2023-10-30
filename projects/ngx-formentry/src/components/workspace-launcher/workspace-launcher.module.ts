import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { WorkspaceLauncherComponent } from './workspace-launcher.component';

@NgModule({
  declarations: [WorkspaceLauncherComponent],
  exports: [WorkspaceLauncherComponent],
  imports: [CommonModule, FormsModule]
})
export class WorkspaceLauncherModule {}
