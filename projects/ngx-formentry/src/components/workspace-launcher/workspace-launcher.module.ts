import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { WorkspaceLauncherComponent } from './workspace-launcher.component';

@NgModule({
  declarations: [WorkspaceLauncherComponent],
  exports: [WorkspaceLauncherComponent],
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class WorkspaceLauncherModule {}
