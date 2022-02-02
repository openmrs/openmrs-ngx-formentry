import { Component, forwardRef, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-custom-component-wrapper',
  templateUrl: "custom-component-wrapper.component.html",
})
export class CustomComponentWrapperComponent implements OnInit {
  @Input()
  componentConfigs: Array<{ tag: '', url?: '', module?: '', detail?: any }>;

  @Input()
  dark = true;
  ngOnInit(): void {
  }
}