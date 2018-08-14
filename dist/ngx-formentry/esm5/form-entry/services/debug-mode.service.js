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
var DebugModeService = /** @class */ (function () {
    function DebugModeService() {
        this.cookieKey = 'formDebug';
    }
    /**
     * @return {?}
     */
    DebugModeService.prototype.debugEnabled = /**
     * @return {?}
     */
    function () {
        // check if the hidefield
        return false;
    };
    DebugModeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DebugModeService.ctorParameters = function () { return []; };
    return DebugModeService;
}());
export { DebugModeService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctbW9kZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9zZXJ2aWNlcy9kZWJ1Zy1tb2RlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQVF2Qzt5QkFGbUIsV0FBVztLQUc3Qjs7OztJQUNLLHVDQUFZOzs7OztRQUdWLE1BQU0sQ0FBQyxLQUFLLENBQUM7OztnQkFYeEIsVUFBVTs7OzsyQkFWWDs7U0FZYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhpcyBzZXJ2aWNlIGNoZWNrcyBpZiB0aGUgZGVidWcgbW9kZSBvbiBuZzItYW1yc1xuaGFzIGJlZW4gZW5hYmxlZCBieSBjaGVja2luZyBjb29raWVzLlxuSWYgdGhlIGRlYnVnIG1vZGUgaGFzIGJlZW4gZW5hYmxlZCB0aGVuXG5pdCByZXR1cm5zIHRydWUgYW5kIGFsbCBmaWVsZHMgYXJlIGRpc3BsYXllZFxuZm9yIHVzZSBieSB0ZXN0ZXJzXG4qL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIERlYnVnTW9kZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIGNvb2tpZUtleSA9ICdmb3JtRGVidWcnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgcHVibGljIGRlYnVnRW5hYmxlZCgpOiBib29sZWFuIHtcblxuICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBoaWRlZmllbGRcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgfVxufVxuIl19