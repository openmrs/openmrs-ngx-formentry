import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'ofe-tab',
    templateUrl: 'tab.component.html',
    styleUrls: ['./tab.component.css'],
    standalone: false
})
export class TabComponent {
  @Input() public tabTitle: string;
  @Input() public tabSubTitle: string;
  @Input() public active = false;
  @Input() public disabled = false;
  @Input() public bypassDOM = false;
  @Input() public customPaneClass = '';
  @ContentChild(TemplateRef) template: TemplateRef<any>;
}
