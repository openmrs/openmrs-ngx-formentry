import {
  Component,
  ContentChildren,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import type { QueryList } from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
  selector: 'ngx-tab-set',
  styleUrls: ['ngx-tab-set.component.scss'],
  templateUrl: 'ngx-tab-set.component.html'
})
export class TabSetComponent implements AfterContentInit, OnChanges {
  @ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;

  @Input() public disableStyle = false;
  @Input() public customNavClass: String = '';
  @Input() public customTabsClass: String = '';
  @Input() public selectedIndex: Number = 0;

  @Output() public onSelect = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedIndex && !changes.selectedIndex.firstChange) {
      this.selectTab(this.tabs.toArray()[changes.selectedIndex.currentValue]);
    }
  }

  // contentChildren are set
  public ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter((tab: TabComponent) => tab.active);

    // if there is no active tab set, activate the first
    setTimeout(() => {
      if (activeTabs.length === 0) {
        this.selectTab(this.tabs.first);
      }
    });
  }

  public onHover($event) {}

  public selectTab(tabToSelect: TabComponent): void {
    if (tabToSelect.disabled === true || tabToSelect.active === true) {
      return;
    }

    // deactivate all tabs
    this.tabs.toArray().forEach((tab: TabComponent) => (tab.active = false));

    // activate the tab the user has clicked on.
    tabToSelect.active = true;
    this.onSelect.emit(this.tabs.toArray().indexOf(tabToSelect));
  }
  public getStatusClasses(active, disabled) {
    if (active) {
      return 'active';
    }
    if (!disabled && !active) {
      return 'enabled';
    }
    if (disabled) {
      return 'disabled';
    }
  }
}
