import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofe-workspace-launcher',
  templateUrl: './workspace-launcher.component.html'
})
export class WorkspaceLauncherComponent implements OnInit {
  @Input() public id: string;
  @Input() public label: any;

  public ngOnInit() {
    // Initialize any properties if necessary
  }

  public handleClick(event: any) {
    console.log('You clicked the button!!!');
    console.log('id', this.id, 'label', this.label);
  }
}
