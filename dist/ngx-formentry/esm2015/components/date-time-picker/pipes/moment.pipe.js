/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * moment.pipe
 */
import { Pipe } from '@angular/core';
export class MomentPipe {
    /**
     * @param {?} moment
     * @param {?=} format
     * @return {?}
     */
    transform(moment, format) {
        return format ? moment.format(format) : moment.format('MMM DD, YYYY');
    }
}
MomentPipe.decorators = [
    { type: Pipe, args: [{ name: 'moment' },] },
];
function MomentPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MomentPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MomentPipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvcGlwZXMvbW9tZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BELE1BQU07Ozs7OztJQUNGLFNBQVMsQ0FBQyxNQUFjLEVBQUUsTUFBZTtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3pFOzs7WUFMSixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtb21lbnQucGlwZVxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudC9tb21lbnQnO1xuXG5AUGlwZSh7bmFtZTogJ21vbWVudCd9KVxuXG5leHBvcnQgY2xhc3MgTW9tZW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShtb21lbnQ6IE1vbWVudCwgZm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdCA/IG1vbWVudC5mb3JtYXQoZm9ybWF0KSA6IG1vbWVudC5mb3JtYXQoJ01NTSBERCwgWVlZWScpO1xuICAgIH1cbn1cbiJdfQ==