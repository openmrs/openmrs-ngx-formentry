import { Component } from '@angular/core';
import { MockForm } from './mock/mock-form';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data = new MockForm().getMockForm();
  constructor() {
    // Do stuff
  }
}
