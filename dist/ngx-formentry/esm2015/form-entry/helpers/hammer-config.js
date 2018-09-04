/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
export class HammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = /** @type {?} */ ({
            // override hammerjs default configuration
            'pan': { threshold: 5 },
            'swipe': {
                direction: Hammer.DIRECTION_HORIZONTAL
            }
        });
    }
}
function HammerConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    HammerConfig.prototype.overrides;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWVyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvaGVscGVycy9oYW1tZXItY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRSxPQUFPLEtBQUssTUFBTSxNQUFNLFVBQVUsQ0FBQztBQUNuQyxNQUFNLG1CQUFvQixTQUFRLG1CQUFtQjs7OzJDQUNoQzs7WUFFYixLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sRUFBRTtnQkFDTCxTQUFTLEVBQUUsTUFBTSxDQUFDLG9CQUFvQjthQUN6QztTQUNKOztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBIYW1tZXJHZXN0dXJlQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCAqIGFzIEhhbW1lciBmcm9tICdoYW1tZXJqcyc7XG5leHBvcnQgY2xhc3MgSGFtbWVyQ29uZmlnIGV4dGVuZHMgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XG4gICAgb3ZlcnJpZGVzID0gPGFueT57XG4gICAgICAgIC8vIG92ZXJyaWRlIGhhbW1lcmpzIGRlZmF1bHQgY29uZmlndXJhdGlvblxuICAgICAgICAncGFuJzogeyB0aHJlc2hvbGQ6IDUgfSxcbiAgICAgICAgJ3N3aXBlJzoge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUxcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=