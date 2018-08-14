/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
This service checks if the debug mode on ng2-amrs
has been enabled by checking cookies.
If the debug mode has been enabled then
it returns true and all fields are displayed
for use by testers
*/
import { Injectable } from '@angular/core';
export class DebugModeService {
    constructor() {
        this.cookieKey = 'formDebug';
    }
    /**
     * @return {?}
     */
    debugEnabled() {
        // check if the hidefield
        return false;
    }
}
DebugModeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DebugModeService.ctorParameters = () => [];
function DebugModeService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DebugModeService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DebugModeService.ctorParameters;
    /** @type {?} */
    DebugModeService.prototype.cookieKey;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU07SUFJRjt5QkFGbUIsV0FBVztLQUc3Qjs7OztJQUNLLFlBQVk7O1FBR1YsTUFBTSxDQUFDLEtBQUssQ0FBQzs7OztZQVh4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoaXMgc2VydmljZSBjaGVja3MgaWYgdGhlIGRlYnVnIG1vZGUgb24gbmcyLWFtcnNcbmhhcyBiZWVuIGVuYWJsZWQgYnkgY2hlY2tpbmcgY29va2llcy5cbklmIHRoZSBkZWJ1ZyBtb2RlIGhhcyBiZWVuIGVuYWJsZWQgdGhlblxuaXQgcmV0dXJucyB0cnVlIGFuZCBhbGwgZmllbGRzIGFyZSBkaXNwbGF5ZWRcbmZvciB1c2UgYnkgdGVzdGVyc1xuKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z01vZGVTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBjb29raWVLZXkgPSAnZm9ybURlYnVnJztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgIHB1YmxpYyBkZWJ1Z0VuYWJsZWQoKTogYm9vbGVhbiB7XG5cbiAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgaGlkZWZpZWxkXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgIH1cbn1cbiJdfQ==