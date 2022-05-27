import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { TabSetComponent } from '../components/ngx-tab-set.component';
import { TabComponent } from '../components/tab.component';
import { HoverClassDirective } from '../directives/hover-class.directive';

@NgModule({
  declarations: [
    TabComponent,
    TabSetComponent,
    HoverClassDirective
  ],
  exports: [
    TabComponent,
    TabSetComponent,
  ],
  imports: [CommonModule]
})
export class NgxTabSetModule {

  /**
   * Use in AppModule: new instance of NgxTabset.
   */
  public static forRoot(): ModuleWithProviders<NgxTabSetModule> {
    return {
      ngModule: NgxTabSetModule,
      providers: []
    };
  }

  /**
   * Use in features modules with lazy loading: new instance of NgxTabset.
   */
  public static forChild(): ModuleWithProviders<NgxTabSetModule> {
    return {
      ngModule: NgxTabSetModule,
      providers: []
    };
  }

}
