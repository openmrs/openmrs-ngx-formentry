import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { TabsetComponent } from '../components/tab-set';
import { TabComponent } from '../components/tab';
import { HoverClassDirective } from '../directives/hover-class.directive';

@NgModule({
  declarations: [TabComponent, TabsetComponent, HoverClassDirective],
  exports: [TabComponent, TabsetComponent],
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
