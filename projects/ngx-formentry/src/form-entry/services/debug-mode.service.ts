/*
This service checks if the debug mode on ng2-amrs
has been enabled by checking cookies.
If the debug mode has been enabled then
it returns true and all fields are displayed
for use by testers
*/

import { Injectable } from '@angular/core';
import { CookieService, CookieOptions } from 'angular2-cookie/core';

@Injectable()

export class DebugModeService {

    public cookieKey: string = 'formDebug';

    constructor(private _cookieservice: CookieService) {
    }
   public debugEnabled(): boolean {

             // check if the hidefield
             const serviceCookie = this._cookieservice.get(this.cookieKey);
             // console.log('Service Cookie', serviceCookie);

             if (typeof serviceCookie === 'undefined') {
                       return false;
             } else {
                    if (serviceCookie === 'true') {
                           return true;
                    } else {
                           return false;
                    }
             }
     }
}
