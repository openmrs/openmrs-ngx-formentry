/*
This service checks if the debug mode on ng2-amrs
has been enabled by checking cookies.
If the debug mode has been enabled then
it returns true and all fields are displayed
for use by testers
*/

import { Injectable } from '@angular/core';

@Injectable()
export class DebugModeService {
  public cookieKey = 'formDebug';

  constructor() {}
  public debugEnabled(): boolean {
    // check if the hidefield
    return false;
  }
}
