import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ngx-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['./tab.component.css']
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
